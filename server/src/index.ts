import { WebSocketServer, WebSocket } from 'ws'
import { QuizRoom } from './QuizRoom'
import { ClientMessage } from '../../packages/shared-types/src'
import { randomUUID } from 'crypto'

const wss = new WebSocketServer({ port: 8080 })

console.log("WS server running on ws://localhost:8080")

// Rooms storage
const rooms = new Map<string, QuizRoom>()

// Player → room mapping
const playerRoom = new Map<string, string>()

// Connection handler
wss.on('connection', (ws: WebSocket) => {

  const playerId = randomUUID()
  console.log("Client connected:", playerId)

  ws.on('message', (raw) => {

    try {

      const msg: ClientMessage = JSON.parse(raw.toString())
      console.log("Received:", msg)

      /*
      =====================================
      JOIN QUIZ
      =====================================
      */
      if (msg.type === 'join') {

        const code = msg.quizCode.trim().toUpperCase()

        const room = rooms.get(code)

        if (!room) {
          ws.send(JSON.stringify({
            type: "error",
            message: "Invalid quiz code"
          }))
          return
        }

        room.addPlayer(playerId, msg.name, ws)
        playerRoom.set(playerId, code)

        return
      }

      /*
      =====================================
      ROUTING AFTER JOIN
      =====================================
      */

      const roomCode = playerRoom.get(playerId)
      if (!roomCode) return

      const room = rooms.get(roomCode)
      if (!room) return

      /*
      =====================================
      ANSWER
      =====================================
      */
      if (msg.type === 'answer') {
        room.answer(playerId, msg.choiceIndex)
      }

      /*
      =====================================
      HOST ACTIONS
      =====================================
      */
      if (msg.type === 'host:start') {
        room.start()
      }

      if (msg.type === 'host:next') {
        room.nextQ()
      }

      /*
      =====================================
      HOST CREATE ROOM (IMPORTANT)
      =====================================
      */
      if (msg.type === 'host:create') {

        const code = msg.quizCode.trim().toUpperCase()

        if (rooms.has(code)) {
          ws.send(JSON.stringify({
            type: "error",
            message: "Room already exists"
          }))
          return
        }

        rooms.set(code, new QuizRoom(code))

        ws.send(JSON.stringify({
          type: "host:room_created",
          code
        }))
      }

    } catch (err) {
      console.error("Invalid message:", err)
    }

  })

  /*
  =====================================
  CLEANUP DISCONNECT
  =====================================
  */
  ws.on('close', () => {

    console.log("Client disconnected")

    const roomCode = playerRoom.get(playerId)

    if (!roomCode) return

    const room = rooms.get(roomCode)
    if (!room) return

    room.removePlayer(playerId)
    playerRoom.delete(playerId)

  })

})
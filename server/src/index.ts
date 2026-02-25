import { WebSocketServer, WebSocket } from 'ws'
import { QuizRoom } from './QuizRoom'
import { ClientMessage } from '../../packages/shared-types/src'
import { randomUUID } from 'crypto'

const wss = new WebSocketServer({ port: 8080 })

console.log("WS server running on ws://localhost:8080")

// Toutes les rooms
const rooms = new Map<string, QuizRoom>()

// Permet de savoir dans quelle room est chaque joueur
const playerRoom = new Map<string, string>()

wss.on('connection', (ws: WebSocket) => {
  console.log("Client connected")

  // On génère un id unique par connexion
  const playerId = randomUUID()

  ws.on('message', (raw) => {
    try {
      const msg: ClientMessage = JSON.parse(raw.toString())
      console.log("Received:", msg)

      // HOST CREATE
      if (msg.type === 'host:create') {
        console.log("🎮 HOST CREATE - Code:", msg.quizCode)
        const room = new QuizRoom(msg.quizCode, msg.questions)
        rooms.set(msg.quizCode, room)
        // Le host rejoint la room avec isHost=true
        room.addPlayer(playerId, 'Host', ws, true)
        playerRoom.set(playerId, msg.quizCode)
        console.log("🎮 Host added to room. Total players:", room.players.size)
        return
      }

      // JOIN
      if (msg.type === 'join') {
        console.log("👤 PLAYER JOIN - Code:", msg.quizCode, "Name:", msg.name)
        let room = rooms.get(msg.quizCode)

        if (!room) {
          console.log("⚠️ Room not found, creating new one:", msg.quizCode)
          room = new QuizRoom(msg.quizCode)
          rooms.set(msg.quizCode, room)
        }

        room.addPlayer(playerId, msg.name, ws)
        playerRoom.set(playerId, msg.quizCode)
        console.log("👤 Player added. Total in room:", room.players.size)

        return
      }

      const roomCode = playerRoom.get(playerId)
      if (!roomCode) return

      const room = rooms.get(roomCode)
      if (!room) return

      // ANSWER
      if (msg.type === 'answer') {
        room.answer(playerId, msg.choiceIndex)
      }

      // HOST START
      if (msg.type === 'host:start') {
        room.start()
      }

      // HOST NEXT
      if (msg.type === 'host:next') {
        room.nextQ()
      }

    } catch (err) {
      console.error("Invalid message:", err)
    }
  })

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
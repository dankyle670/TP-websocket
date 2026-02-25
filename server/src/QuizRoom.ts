import { WebSocket } from 'ws'
import { QuizPhase } from '../../packages/shared-types/src'

type Player = {
  id: string
  name: string
  score: number
  ws: WebSocket
}

type Question = {
  id: number
  text: string
  choices: string[]
  correctIndex: number
}

export class QuizRoom {
  code: string
  phase: QuizPhase = 'lobby'
  players = new Map<string, Player>()
  questions: Question[]
  currentQ = 0
  answers = new Map<string, number>()
  timer: NodeJS.Timeout | null = null
  remaining = 0
  totalTime = 10000 // 10 sec

  constructor(code: string) {
    this.code = code

    // Questions mock pour test
    this.questions = [
      {
        id: 1,
        text: "Capital of France?",
        choices: ["Berlin", "Paris", "Rome", "Madrid"],
        correctIndex: 1
      },
      {
        id: 2,
        text: "2 + 2 = ?",
        choices: ["3", "4", "5", "22"],
        correctIndex: 1
      }
    ]
  }

  addPlayer(id: string, name: string, ws: WebSocket) {
    this.players.set(id, { id, name, score: 0, ws })
    this.broadcastState()
  }

  removePlayer(id: string) {
    this.players.delete(id)
  }

  start() {
    if (this.phase !== 'lobby') return

    this.phase = 'question'
    this.launchQuestion()
  }

  launchQuestion() {
    this.answers.clear()
    this.remaining = this.totalTime

    this.broadcastState()

    this.timer = setInterval(() => {
      this.remaining -= 1000
      this.broadcastTick()

      if (this.remaining <= 0) {
        this.timeUp()
      }
    }, 1000)
  }

  answer(playerId: string, choiceIndex: number) {
    if (this.phase !== 'question') return
    if (this.answers.has(playerId)) return

    this.answers.set(playerId, choiceIndex)

    const q = this.questions[this.currentQ]
    const correct = choiceIndex === q.correctIndex

    if (correct) {
      const score = 1000 * (this.remaining / this.totalTime)
      const player = this.players.get(playerId)
      if (player) player.score += Math.floor(score)
    }

    if (this.answers.size === this.players.size) {
      this.timeUp()
    }
  }

  timeUp() {
    if (this.timer) clearInterval(this.timer)

    this.phase = 'results'
    this.broadcastState()
  }

  nextQ() {
    if (this.currentQ >= this.questions.length - 1) {
      this.phase = 'leaderboard'
    } else {
      this.currentQ++
      this.phase = 'question'
      this.launchQuestion()
    }

    this.broadcastState()
  }

  broadcastTick() {
    this.broadcast({
      type: 'tick',
      remaining: this.remaining
    })
  }

  broadcastState() {
    const payload = {
      type: 'state',
      phase: this.phase,
      currentQ: this.currentQ,
      question: this.questions[this.currentQ],
      players: Array.from(this.players.values()).map(p => ({
        id: p.id,
        name: p.name,
        score: p.score
      }))
    }

    this.broadcast(payload)
  }

  broadcast(data: any) {
    const json = JSON.stringify(data)
    this.players.forEach(p => {
      p.ws.send(json)
    })
  }
}
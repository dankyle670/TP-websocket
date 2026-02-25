import { useState, useEffect } from 'react'
import { useWebSocket } from './hooks/useWebSocket'
import CreateQuiz from './components/CreateQuiz'
import Lobby from './components/Lobby'
import QuestionView from './components/QuestionView'
import Results from './components/Results'
import Leaderboard from './components/Leaderboard'

type QuizQuestion = {
  text: string
  choices: string[]
  correctIndex: number
  id?: number
}

type Player = {
  id: string
  name: string
  score: number
  isHost?: boolean
}

type AppState = 'create' | 'lobby' | 'question' | 'results' | 'leaderboard' | 'ended'

export default function App() {
  const { connected, message, send } = useWebSocket('ws://localhost:8080')
  const [appState, setAppState] = useState<AppState>('create')
  const [quizCode, setQuizCode] = useState('')
  const [players, setPlayers] = useState<Player[]>([])
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [remaining, setRemaining] = useState(10000)

  // Handle server messages
  useEffect(() => {
    if (!message) return

    console.log('Host received message:', message)

    if (message.type === 'state') {
      console.log('State message - Phase:', message.phase, 'Players:', message.players)
      setAppState(message.phase as AppState)
      if (message.players) {
        setPlayers(message.players)
      }
      if (message.question) {
        setCurrentQuestion(message.currentQ)
      }
    } else if (message.type === 'tick') {
      setRemaining(message.remaining)
    }
  }, [message])

  const handleCreateQuiz = (quizQuestions: QuizQuestion[]) => {
    // Generate a random quiz code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    console.log('Creating quiz with code:', code)
    setQuizCode(code)
    setQuestions(quizQuestions)
    setAppState('lobby')
    // Reset players for new quiz
    setPlayers([])

    // Notify server
    send({
      type: 'host:create',
      quizCode: code,
      questions: quizQuestions
    })
  }

  const handleStartQuiz = () => {
    send({
      type: 'host:start'
    })
  }

  const handleNextQuestion = () => {
    send({
      type: 'host:next'
    })
  }

  const handleFinish = () => {
    setAppState('create')
    setQuizCode('')
    setPlayers([])
    setQuestions([])
    setCurrentQuestion(0)
  }

  if (!connected) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center' }}>
          <h1>Connecting to server...</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
            Make sure the WebSocket server is running on ws://localhost:8080
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      {appState === 'create' && (
        <CreateQuiz onCreateQuiz={handleCreateQuiz} />
      )}

      {appState === 'lobby' && (
        <Lobby
          code={quizCode}
          players={players}
          onStartQuiz={handleStartQuiz}
        />
      )}

      {appState === 'question' && questions[currentQuestion] && (
        <QuestionView
          questionNumber={currentQuestion + 1}
          totalQuestions={questions.length}
          question={questions[currentQuestion]}
          remaining={remaining}
          onNextQuestion={handleNextQuestion}
        />
      )}

      {appState === 'results' && questions[currentQuestion] && (
        <Results
          question={questions[currentQuestion]}
          players={players}
          onNextQuestion={handleNextQuestion}
        />
      )}

      {appState === 'leaderboard' && (
        <Leaderboard
          players={players}
          onFinish={handleFinish}
        />
      )}
    </>
  )
}

import { useState, useEffect } from 'react'
import { useWebSocket } from './hooks/useWebSocket'
import JoinScreen from './components/JoinScreen'
import WaitingLobby from './components/WaitingLobby'
import AnswerScreen from './components/AnswerScreen'
import FeedbackScreen from './components/FeedbackScreen'
import ScoreScreen from './components/ScoreScreen'

type AppState = 'join' | 'lobby' | 'question' | 'feedback' | 'leaderboard' | 'ended'

export default function App() {
  const { connected, message, send } = useWebSocket('ws://localhost:8080')
  const [appState, setAppState] = useState<AppState>('join')
  const [playerId, setPlayerId] = useState('')
  const [playerName, setPlayerName] = useState('')
  const [players, setPlayers] = useState<Array<{ id: string; name: string; score: number }>>([])
  const [question, setQuestion] = useState<{ text: string; choices: string[]; correctIndex?: number } | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [remaining, setRemaining] = useState(10000)
  const [answered, setAnswered] = useState(false)
  const [answeredChoiceIndex, setAnsweredChoiceIndex] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState(false)
  const [earnedScore, setEarnedScore] = useState(0)
  const [, setQuizCode] = useState('')

  // Handle server messages
  useEffect(() => {
    if (!message) return

    if (message.type === 'state') {
      setAppState(message.phase as AppState)
      
      if (message.players) {
        setPlayers(message.players)
      }
      
      if (message.question) {
        setQuestion(message.question)
        setCurrentQuestion(message.currentQ)
        setAnswered(false)
        setAnsweredChoiceIndex(null)
      }
    } else if (message.type === 'tick') {
      setRemaining(message.remaining)
    }
  }, [message])

  const handleJoin = (code: string, name: string) => {
    // Generate a player ID (in real app, server would do this)
    const id = Math.random().toString(36).substring(2, 11)
    setPlayerId(id)
    setPlayerName(name)
    setQuizCode(code)
    setAppState('lobby')

    // Send join message
    send({
      type: 'join',
      quizCode: code,
      name: name
    })
  }

  const handleAnswer = (choiceIndex: number) => {
    if (answered) return

    setAnswered(true)
    setAnsweredChoiceIndex(choiceIndex)

    // Determine if correct
    const correct = choiceIndex === question?.correctIndex
    setIsCorrect(correct)

    // Calculate score (simplified, real logic should be from server)
    const score = correct ? Math.round(1000 + 500 * (remaining / 10000)) : 0
    setEarnedScore(score)

    // Send answer
    send({
      type: 'answer',
      questionId: currentQuestion,
      choiceIndex: choiceIndex
    })
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
      {appState === 'join' && (
        <JoinScreen onJoin={handleJoin} />
      )}

      {appState === 'lobby' && (
        <WaitingLobby
          playerName={playerName}
          playerCount={players.length}
        />
      )}

      {appState === 'question' && question && (
        <AnswerScreen
          questionNumber={currentQuestion + 1}
          question={question}
          remaining={remaining}
          onAnswer={handleAnswer}
          answered={answered}
        />
      )}

      {appState === 'feedback' && question && answeredChoiceIndex !== null && (
        <FeedbackScreen
          isCorrect={isCorrect}
          correctAnswer={question.choices[question.correctIndex || 0]}
          yourAnswer={question.choices[answeredChoiceIndex]}
          score={earnedScore}
        />
      )}

      {appState === 'leaderboard' && (
        <ScoreScreen
          players={players}
          currentPlayerId={playerId}
        />
      )}
    </>
  )
}

import { useState } from 'react'

type JoinScreenProps = {
  onJoin: (quizCode: string, playerName: string) => void
}

export default function JoinScreen({ onJoin }: JoinScreenProps) {
  const [quizCode, setQuizCode] = useState('')
  const [playerName, setPlayerName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!quizCode.trim() || !playerName.trim()) {
      alert('Please fill in all fields')
      return
    }

    onJoin(quizCode.toUpperCase(), playerName)
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Join a Quiz</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Quiz Code</label>
            <input
              type="text"
              value={quizCode}
              onChange={(e) => setQuizCode(e.target.value.toUpperCase())}
              placeholder="Enter the quiz code"
              maxLength={6}
              style={{ fontSize: '1.5rem', textAlign: 'center', letterSpacing: '0.1em' }}
            />
          </div>

          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <button type="submit" style={{ width: '100%' }}>
            Join Quiz
          </button>
        </form>
      </div>
    </div>
  )
}

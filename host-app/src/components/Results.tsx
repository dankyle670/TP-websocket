import { useEffect, useState } from 'react'

type ResultsProps = {
  question: { text: string; choices: string[]; correctIndex: number }
  players: Array<{ id: string; name: string; score: number }>
  onNextQuestion: () => void
}

export default function Results({ question, players, onNextQuestion }: ResultsProps) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    setAnimated(true)
  }, [players])

  // Sort by score descending
  const sorted = [...players].sort((a, b) => b.score - a.score)
  const maxScore = sorted[0]?.score || 1

  return (
    <div className="container">
      <div className="card results-container">
        <h1>Results</h1>
        <div style={{ marginBottom: '2rem', padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
          <p style={{ marginBottom: '0.5rem' }}>Correct answer:</p>
          <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--success)' }}>
            {question.choices[question.correctIndex]}
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          {sorted.map((player) => {
            const percentage = (player.score / maxScore) * 100
            return (
              <div key={player.id} className="result-bar">
                <div className="result-bar-header">
                  <span className="result-bar-label">{player.name}</span>
                  <span className="result-bar-score">{player.score} pts</span>
                </div>
                <div className="result-bar-bg">
                  <div
                    className="result-bar-fill"
                    style={{
                      width: animated ? `${percentage}%` : '0%'
                    }}
                  >
                    {percentage > 10 && `${Math.round(percentage)}%`}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <button onClick={onNextQuestion} style={{ width: '100%' }} className="success">
          Next Question
        </button>
      </div>
    </div>
  )
}

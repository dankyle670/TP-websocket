type AnswerScreenProps = {
  questionNumber: number
  question: {
    text: string
    choices: string[]
    correctIndex?: number
  }
  remaining: number
  onAnswer: (choiceIndex: number) => void
  answered: boolean
}

const letters = ['A', 'B', 'C', 'D']

export default function AnswerScreen({
  questionNumber,
  question,
  remaining,
  onAnswer,
  answered
}: AnswerScreenProps) {
  const secondsLeft = Math.ceil(remaining / 1000)
  const percentage = (remaining / 10000) * 100

  return (
    <div className="container">
      <div className="card question-container">
        <div className="question-header">
          <div className="question-number">
            Question {questionNumber}
          </div>
          <div className="question-text">{question.text}</div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            background: 'var(--bg-tertiary)',
            height: '10px',
            borderRadius: '5px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${percentage}%`,
              height: '100%',
              background: 'linear-gradient(90deg, var(--success), var(--warning), var(--error))',
              transition: 'width 0.1s linear'
            }} />
          </div>
          <div style={{ marginTop: '0.5rem', textAlign: 'right', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            {secondsLeft}s remaining
          </div>
        </div>

        <div className="answers-grid">
          {question.choices.map((choice, index) => (
            <button
              key={index}
              className={`answer-button ${letters[index].toLowerCase()} ${answered ? 'disabled' : ''}`}
              onClick={() => !answered && onAnswer(index)}
              disabled={answered}
            >
              <div>
                <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>Option {letters[index]}</div>
                <div style={{ marginTop: '0.25rem' }}>{choice}</div>
              </div>
            </button>
          ))}
        </div>

        {answered && (
          <div style={{ 
            textAlign: 'center', 
            marginTop: '2rem',
            color: 'var(--text-secondary)'
          }}>
            ✓ Answer submitted. Waiting for results...
          </div>
        )}
      </div>
    </div>
  )
}

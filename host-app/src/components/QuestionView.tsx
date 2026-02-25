type QuestionViewProps = {
  questionNumber: number
  totalQuestions: number
  question: { text: string; choices: string[] }
  remaining: number
  onNextQuestion: () => void
}

export default function QuestionView({
  questionNumber,
  totalQuestions,
  question,
  remaining,
  onNextQuestion
}: QuestionViewProps) {
  const secondsLeft = Math.ceil(remaining / 1000)
  const percentage = (remaining / 10000) * 100

  return (
    <div className="container">
      <div className="card question-container">
        <div className="question-header">
          <div className="question-number">
            Question {questionNumber} of {totalQuestions}
          </div>
          <div className="question-text">{question.text}</div>
        </div>

        <div className="timer">
          <div
            className={`timer-circle ${secondsLeft <= 3 ? 'danger' : secondsLeft <= 5 ? 'warning' : ''}`}
          >
            {secondsLeft}s
          </div>
          <div style={{ flex: 1 }}>
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
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Waiting for players to answer...</h3>
          <div style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
            Players can see their answer options
          </div>
        </div>

        <div className="button-group" style={{ marginTop: '3rem' }}>
          <button onClick={onNextQuestion} disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
            Next (waiting for timer)
          </button>
        </div>
      </div>
    </div>
  )
}

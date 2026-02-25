type FeedbackScreenProps = {
  isCorrect: boolean
  correctAnswer: string
  yourAnswer: string
  score: number
}

export default function FeedbackScreen({
  isCorrect,
  correctAnswer,
  yourAnswer,
  score
}: FeedbackScreenProps) {
  return (
    <div className="container">
      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          {isCorrect ? (
            <>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
              <h1 style={{ color: 'var(--success)' }}>Correct!</h1>
            </>
          ) : (
            <>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>❌</div>
              <h1 style={{ color: 'var(--error)' }}>Incorrect</h1>
            </>
          )}
        </div>

        <div style={{ background: 'var(--bg-tertiary)', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            Your answer:
          </p>
          <p style={{ fontSize: '1.125rem', fontWeight: '600' }}>{yourAnswer}</p>
        </div>

        {!isCorrect && (
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Correct answer:
            </p>
            <p style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--success)' }}>{correctAnswer}</p>
          </div>
        )}

        <div style={{ background: 'var(--bg-tertiary)', borderRadius: '0.5rem', padding: '1rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            Points earned:
          </p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>
            +{score}
          </p>
        </div>

        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem',
          color: 'var(--text-secondary)'
        }}>
          ⏳ Waiting for next question...
        </div>
      </div>
    </div>
  )
}

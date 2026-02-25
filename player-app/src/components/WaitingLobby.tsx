type WaitingLobbyProps = {
  playerName: string
  playerCount: number
}

export default function WaitingLobby({ playerName, playerCount }: WaitingLobbyProps) {
  return (
    <div className="container">
      <div className="card">
        <h1>Waiting for Quiz to Start</h1>
        
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👋</div>
          <h2>Welcome, {playerName}!</h2>
        </div>

        <div style={{ 
          background: 'var(--bg-tertiary)', 
          border: '2px solid var(--primary)',
          borderRadius: '0.5rem',
          padding: '2rem',
          textAlign: 'center',
          margin: '2rem 0'
        }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Players in lobby</p>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)', marginTop: '0.5rem' }}>
            {playerCount}
          </p>
        </div>

        <div style={{ 
          textAlign: 'center',
          color: 'var(--text-secondary)',
          marginTop: '2rem'
        }}>
          <p>⏳ Waiting for the host to start the quiz...</p>
          <p style={{ fontSize: '0.875rem', marginTop: '1rem' }}>
            The quiz will start soon. Get ready!
          </p>
        </div>
      </div>
    </div>
  )
}

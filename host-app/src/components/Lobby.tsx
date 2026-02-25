type LobbyProps = {
  code: string
  players: Array<{ id: string; name: string; score: number }>
  onStartQuiz: () => void
}

export default function Lobby({ code, players, onStartQuiz }: LobbyProps) {
  console.log('Lobby received players:', players.map(p => `${p.name} (host: ${p.isHost || false})`))
  // Filter out the host from the display (only show actual players)
  const otherPlayers = players.filter(p => !p.isHost)
  console.log('Other players (filtered):', otherPlayers.map(p => p.name))
  
  return (
    <div className="container">
      <div className="card">
        <h1>Quiz Lobby</h1>

        <div className="lobby-info">
          <p style={{ marginBottom: '1rem' }}>Share this code with players:</p>
          <div className="code-display">{code}</div>
        </div>

        <div className="lobby-info">
          <h2>Players ({otherPlayers.length})</h2>
          <div className="players-list">
            {otherPlayers.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
                Waiting for players...
              </p>
            ) : (
              otherPlayers.map((player) => (
                <div key={player.id} className="player-item">
                  <span className="player-name">{player.name}</span>
                  <span className="player-score">{player.score} pts</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="button-group">
          <button
            onClick={onStartQuiz}
            disabled={otherPlayers.length === 0}
            style={{ opacity: otherPlayers.length === 0 ? 0.5 : 1, cursor: otherPlayers.length === 0 ? 'not-allowed' : 'pointer' }}
            className="success"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  )

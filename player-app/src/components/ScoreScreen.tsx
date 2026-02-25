type ScoreScreenProps = {
  players: Array<{ id: string; name: string; score: number }>
  currentPlayerId: string
}

export default function ScoreScreen({
  players,
  currentPlayerId
}: ScoreScreenProps) {
  const sorted = [...players].sort((a, b) => b.score - a.score)
  const playerRank = sorted.findIndex(p => p.id === currentPlayerId) + 1

  return (
    <div className="container">
      <div className="card leaderboard-container">
        <div className="leaderboard-title">🏆 Final Results 🏆</div>

        {sorted.map((player, index) => (
          <div
            key={player.id}
            className={`leaderboard-item ${player.id === currentPlayerId ? 'self' : ''}`}
          >
            <div className={`leaderboard-rank ${index === 0 ? 'first' : index === 1 ? 'second' : index === 2 ? 'third' : ''}`}>
              #{index + 1}
            </div>
            <div className="leaderboard-info">
              <div className="leaderboard-name">
                {player.name}
                {player.id === currentPlayerId && ' (You)'}
              </div>
              <div className="leaderboard-score">{player.score} points</div>
            </div>
          </div>
        ))}

        <div style={{ 
          background: 'var(--bg-tertiary)',
          borderRadius: '0.5rem',
          padding: '1rem',
          marginTop: '2rem',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            You finished at:
          </p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>
            #{playerRank}
          </p>
        </div>

        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem',
          color: 'var(--text-secondary)'
        }}>
          Thanks for playing! 🎉
        </div>
      </div>
    </div>
  )
}

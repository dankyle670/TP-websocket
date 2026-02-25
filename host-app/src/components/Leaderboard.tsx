type LeaderboardProps = {
  players: Array<{ id: string; name: string; score: number }>
  onFinish: () => void
}

export default function Leaderboard({ players, onFinish }: LeaderboardProps) {
  const sorted = [...players].sort((a, b) => b.score - a.score)

  return (
    <div className="container">
      <div className="card leaderboard-container">
        <div className="leaderboard-title">🏆 Final Scores 🏆</div>

        {sorted.map((player, index) => (
          <div key={player.id} className="leaderboard-item">
            <div className={`leaderboard-rank ${index === 0 ? 'first' : index === 1 ? 'second' : index === 2 ? 'third' : ''}`}>
              #{index + 1}
            </div>
            <div className="leaderboard-info">
              <div className="leaderboard-name">{player.name}</div>
              <div className="leaderboard-score">{player.score} points</div>
            </div>
          </div>
        ))}

        <div className="button-group">
          <button onClick={onFinish} style={{ width: '100%' }}>
            Finish
          </button>
        </div>
      </div>
    </div>
  )
}

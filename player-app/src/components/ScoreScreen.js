import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function ScoreScreen({ players, currentPlayerId }) {
    const sorted = [...players].sort((a, b) => b.score - a.score);
    const playerRank = sorted.findIndex(p => p.id === currentPlayerId) + 1;
    return (_jsx("div", { className: "container", children: _jsxs("div", { className: "card leaderboard-container", children: [_jsx("div", { className: "leaderboard-title", children: "\uD83C\uDFC6 Final Results \uD83C\uDFC6" }), sorted.map((player, index) => (_jsxs("div", { className: `leaderboard-item ${player.id === currentPlayerId ? 'self' : ''}`, children: [_jsxs("div", { className: `leaderboard-rank ${index === 0 ? 'first' : index === 1 ? 'second' : index === 2 ? 'third' : ''}`, children: ["#", index + 1] }), _jsxs("div", { className: "leaderboard-info", children: [_jsxs("div", { className: "leaderboard-name", children: [player.name, player.id === currentPlayerId && ' (You)'] }), _jsxs("div", { className: "leaderboard-score", children: [player.score, " points"] })] })] }, player.id))), _jsxs("div", { style: {
                        background: 'var(--bg-tertiary)',
                        borderRadius: '0.5rem',
                        padding: '1rem',
                        marginTop: '2rem',
                        textAlign: 'center'
                    }, children: [_jsx("p", { style: { fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }, children: "You finished at:" }), _jsxs("p", { style: { fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }, children: ["#", playerRank] })] }), _jsx("div", { style: {
                        textAlign: 'center',
                        marginTop: '2rem',
                        color: 'var(--text-secondary)'
                    }, children: "Thanks for playing! \uD83C\uDF89" })] }) }));
}

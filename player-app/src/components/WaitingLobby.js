import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function WaitingLobby({ playerName, playerCount }) {
    return (_jsx("div", { className: "container", children: _jsxs("div", { className: "card", children: [_jsx("h1", { children: "Waiting for Quiz to Start" }), _jsxs("div", { style: { textAlign: 'center', marginTop: '2rem' }, children: [_jsx("div", { style: { fontSize: '4rem', marginBottom: '1rem' }, children: "\uD83D\uDC4B" }), _jsxs("h2", { children: ["Welcome, ", playerName, "!"] })] }), _jsxs("div", { style: {
                        background: 'var(--bg-tertiary)',
                        border: '2px solid var(--primary)',
                        borderRadius: '0.5rem',
                        padding: '2rem',
                        textAlign: 'center',
                        margin: '2rem 0'
                    }, children: [_jsx("p", { style: { fontSize: '0.875rem', color: 'var(--text-secondary)' }, children: "Players in lobby" }), _jsx("p", { style: { fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)', marginTop: '0.5rem' }, children: playerCount })] }), _jsxs("div", { style: {
                        textAlign: 'center',
                        color: 'var(--text-secondary)',
                        marginTop: '2rem'
                    }, children: [_jsx("p", { children: "\u23F3 Waiting for the host to start the quiz..." }), _jsx("p", { style: { fontSize: '0.875rem', marginTop: '1rem' }, children: "The quiz will start soon. Get ready!" })] })] }) }));
}

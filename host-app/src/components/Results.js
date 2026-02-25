import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
export default function Results({ question, players, onNextQuestion }) {
    const [animated, setAnimated] = useState(false);
    useEffect(() => {
        setAnimated(true);
    }, [players]);
    // Sort by score descending
    const sorted = [...players].sort((a, b) => b.score - a.score);
    const maxScore = sorted[0]?.score || 1;
    return (_jsx("div", { className: "container", children: _jsxs("div", { className: "card results-container", children: [_jsx("h1", { children: "Results" }), _jsxs("div", { style: { marginBottom: '2rem', padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '0.5rem' }, children: [_jsx("p", { style: { marginBottom: '0.5rem' }, children: "Correct answer:" }), _jsx("p", { style: { fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--success)' }, children: question.choices[question.correctIndex] })] }), _jsx("div", { style: { marginBottom: '2rem' }, children: sorted.map((player) => {
                        const percentage = (player.score / maxScore) * 100;
                        return (_jsxs("div", { className: "result-bar", children: [_jsxs("div", { className: "result-bar-header", children: [_jsx("span", { className: "result-bar-label", children: player.name }), _jsxs("span", { className: "result-bar-score", children: [player.score, " pts"] })] }), _jsx("div", { className: "result-bar-bg", children: _jsx("div", { className: "result-bar-fill", style: {
                                            width: animated ? `${percentage}%` : '0%'
                                        }, children: percentage > 10 && `${Math.round(percentage)}%` }) })] }, player.id));
                    }) }), _jsx("button", { onClick: onNextQuestion, style: { width: '100%' }, className: "success", children: "Next Question" })] }) }));
}

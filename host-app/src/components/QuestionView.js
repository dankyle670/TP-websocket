import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
export default function QuestionView({ questionNumber, totalQuestions, question, remaining, onNextQuestion }) {
    const secondsLeft = Math.ceil(remaining / 1000);
    const percentage = (remaining / 10000) * 100;
    return (_jsx("div", { className: "container", children: _jsxs("div", { className: "card question-container", children: [_jsxs("div", { className: "question-header", children: [_jsxs("div", { className: "question-number", children: ["Question ", questionNumber, " of ", totalQuestions] }), _jsx("div", { className: "question-text", children: question.text })] }), _jsxs("div", { className: "timer", children: [_jsxs("div", { className: `timer-circle ${secondsLeft <= 3 ? 'danger' : secondsLeft <= 5 ? 'warning' : ''}`, children: [secondsLeft, "s"] }), _jsx("div", { style: { flex: 1 }, children: _jsx("div", { style: {
                                    background: 'var(--bg-tertiary)',
                                    height: '10px',
                                    borderRadius: '5px',
                                    overflow: 'hidden'
                                }, children: _jsx("div", { style: {
                                        width: `${percentage}%`,
                                        height: '100%',
                                        background: 'linear-gradient(90deg, var(--success), var(--warning), var(--error))',
                                        transition: 'width 0.1s linear'
                                    } }) }) })] }), _jsxs("div", { style: { marginTop: '2rem' }, children: [_jsx("h3", { style: { marginBottom: '1rem' }, children: "Waiting for players to answer..." }), _jsx("div", { style: { color: 'var(--text-secondary)', textAlign: 'center' }, children: "Players can see their answer options" })] }), _jsx("div", { className: "button-group", style: { marginTop: '3rem' }, children: _jsx("button", { onClick: onNextQuestion, disabled: true, style: { opacity: 0.5, cursor: 'not-allowed' }, children: "Next (waiting for timer)" }) })] }) }));
}

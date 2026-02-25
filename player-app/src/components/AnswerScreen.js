import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
const letters = ['A', 'B', 'C', 'D'];
export default function AnswerScreen({ questionNumber, question, remaining, onAnswer, answered }) {
    const secondsLeft = Math.ceil(remaining / 1000);
    const percentage = (remaining / 10000) * 100;
    return (_jsx("div", { className: "container", children: _jsxs("div", { className: "card question-container", children: [_jsxs("div", { className: "question-header", children: [_jsxs("div", { className: "question-number", children: ["Question ", questionNumber] }), _jsx("div", { className: "question-text", children: question.text })] }), _jsxs("div", { style: { marginBottom: '2rem' }, children: [_jsx("div", { style: {
                                background: 'var(--bg-tertiary)',
                                height: '10px',
                                borderRadius: '5px',
                                overflow: 'hidden'
                            }, children: _jsx("div", { style: {
                                    width: `${percentage}%`,
                                    height: '100%',
                                    background: 'linear-gradient(90deg, var(--success), var(--warning), var(--error))',
                                    transition: 'width 0.1s linear'
                                } }) }), _jsxs("div", { style: { marginTop: '0.5rem', textAlign: 'right', fontSize: '0.875rem', color: 'var(--text-secondary)' }, children: [secondsLeft, "s remaining"] })] }), _jsx("div", { className: "answers-grid", children: question.choices.map((choice, index) => (_jsx("button", { className: `answer-button ${letters[index].toLowerCase()} ${answered ? 'disabled' : ''}`, onClick: () => !answered && onAnswer(index), disabled: answered, children: _jsxs("div", { children: [_jsxs("div", { style: { fontSize: '0.75rem', opacity: 0.7 }, children: ["Option ", letters[index]] }), _jsx("div", { style: { marginTop: '0.25rem' }, children: choice })] }) }, index))) }), answered && (_jsx("div", { style: {
                        textAlign: 'center',
                        marginTop: '2rem',
                        color: 'var(--text-secondary)'
                    }, children: "\u2713 Answer submitted. Waiting for results..." }))] }) }));
}

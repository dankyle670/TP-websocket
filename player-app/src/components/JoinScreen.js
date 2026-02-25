import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export default function JoinScreen({ onJoin }) {
    const [quizCode, setQuizCode] = useState('');
    const [playerName, setPlayerName] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!quizCode.trim() || !playerName.trim()) {
            alert('Please fill in all fields');
            return;
        }
        onJoin(quizCode.toUpperCase(), playerName);
    };
    return (_jsx("div", { className: "container", children: _jsxs("div", { className: "card", children: [_jsx("h1", { children: "Join a Quiz" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Quiz Code" }), _jsx("input", { type: "text", value: quizCode, onChange: (e) => setQuizCode(e.target.value.toUpperCase()), placeholder: "Enter the quiz code", maxLength: 6, style: { fontSize: '1.5rem', textAlign: 'center', letterSpacing: '0.1em' } })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Your Name" }), _jsx("input", { type: "text", value: playerName, onChange: (e) => setPlayerName(e.target.value), placeholder: "Enter your name" })] }), _jsx("button", { type: "submit", style: { width: '100%' }, children: "Join Quiz" })] })] }) }));
}

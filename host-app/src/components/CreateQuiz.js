import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export default function CreateQuiz({ onCreateQuiz }) {
    const [questions, setQuestions] = useState([
        { text: '', choices: ['', '', '', ''], correctIndex: 0 }
    ]);
    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        if (field === 'text') {
            newQuestions[index].text = value;
        }
        else if (field.startsWith('choice-')) {
            const choiceIndex = parseInt(field.split('-')[1]);
            newQuestions[index].choices[choiceIndex] = value;
        }
        else if (field === 'correct') {
            newQuestions[index].correctIndex = value;
        }
        setQuestions(newQuestions);
    };
    const addQuestion = () => {
        setQuestions([
            ...questions,
            { text: '', choices: ['', '', '', ''], correctIndex: 0 }
        ]);
    };
    const removeQuestion = (index) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate
        if (questions.some(q => !q.text || q.choices.some(c => !c))) {
            alert('Please fill all fields');
            return;
        }
        onCreateQuiz(questions);
    };
    return (_jsx("div", { className: "container", children: _jsxs("div", { className: "card", children: [_jsx("h1", { children: "Create Quiz" }), _jsxs("form", { onSubmit: handleSubmit, children: [questions.map((q, qIndex) => (_jsxs("div", { style: { marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(148, 163, 184, 0.2)' }, children: [_jsxs("h3", { children: ["Question ", qIndex + 1] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Question Text" }), _jsx("input", { type: "text", value: q.text, onChange: (e) => handleQuestionChange(qIndex, 'text', e.target.value), placeholder: "Enter question text" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Answers" }), q.choices.map((choice, cIndex) => (_jsxs("div", { style: { marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }, children: [_jsx("input", { type: "text", value: choice, onChange: (e) => handleQuestionChange(qIndex, `choice-${cIndex}`, e.target.value), placeholder: `Choice ${cIndex + 1}`, style: { flex: 1 } }), _jsx("input", { type: "radio", name: `correct-${qIndex}`, checked: q.correctIndex === cIndex, onChange: () => handleQuestionChange(qIndex, 'correct', cIndex), style: { width: 'auto', cursor: 'pointer' } })] }, cIndex)))] }), questions.length > 1 && (_jsx("button", { type: "button", className: "secondary", onClick: () => removeQuestion(qIndex), style: { width: '100%' }, children: "Remove Question" }))] }, qIndex))), _jsx("button", { type: "button", className: "secondary", onClick: addQuestion, style: { width: '100%', marginBottom: '1rem' }, children: "+ Add Question" }), _jsx("button", { type: "submit", style: { width: '100%' }, className: "success", children: "Create Quiz" })] })] }) }));
}

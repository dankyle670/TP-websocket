import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useWebSocket } from './hooks/useWebSocket';
import CreateQuiz from './components/CreateQuiz';
import Lobby from './components/Lobby';
import QuestionView from './components/QuestionView';
import Results from './components/Results';
import Leaderboard from './components/Leaderboard';
export default function App() {
    const { connected, message, send } = useWebSocket('ws://localhost:8080');
    const [appState, setAppState] = useState('create');
    const [quizCode, setQuizCode] = useState('');
    const [players, setPlayers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [remaining, setRemaining] = useState(10000);
    // Handle server messages
    useEffect(() => {
        if (!message)
            return;
        if (message.type === 'state') {
            setAppState(message.phase);
            if (message.players) {
                setPlayers(message.players);
            }
            if (message.question) {
                setCurrentQuestion(message.currentQ);
            }
        }
        else if (message.type === 'tick') {
            setRemaining(message.remaining);
        }
    }, [message]);
    const handleCreateQuiz = (quizQuestions) => {
        // Generate a random quiz code
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        setQuizCode(code);
        setQuestions(quizQuestions);
        setAppState('lobby');
        // Notify server
        send({
            type: 'host:create',
            quizCode: code,
            questions: quizQuestions
        });
    };
    const handleStartQuiz = () => {
        send({
            type: 'host:start'
        });
    };
    const handleNextQuestion = () => {
        send({
            type: 'host:next'
        });
    };
    const handleFinish = () => {
        setAppState('create');
        setQuizCode('');
        setPlayers([]);
        setQuestions([]);
        setCurrentQuestion(0);
    };
    if (!connected) {
        return (_jsx("div", { className: "container", children: _jsxs("div", { className: "card", style: { textAlign: 'center' }, children: [_jsx("h1", { children: "Connecting to server..." }), _jsx("p", { style: { color: 'var(--text-secondary)', marginTop: '1rem' }, children: "Make sure the WebSocket server is running on ws://localhost:8080" })] }) }));
    }
    return (_jsxs(_Fragment, { children: [appState === 'create' && (_jsx(CreateQuiz, { onCreateQuiz: handleCreateQuiz })), appState === 'lobby' && (_jsx(Lobby, { code: quizCode, players: players, onStartQuiz: handleStartQuiz })), appState === 'question' && questions[currentQuestion] && (_jsx(QuestionView, { questionNumber: currentQuestion + 1, totalQuestions: questions.length, question: questions[currentQuestion], remaining: remaining, onNextQuestion: handleNextQuestion })), appState === 'results' && questions[currentQuestion] && (_jsx(Results, { question: questions[currentQuestion], players: players, onNextQuestion: handleNextQuestion })), appState === 'leaderboard' && (_jsx(Leaderboard, { players: players, onFinish: handleFinish }))] }));
}

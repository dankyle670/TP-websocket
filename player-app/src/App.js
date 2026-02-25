import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useWebSocket } from './hooks/useWebSocket';
import JoinScreen from './components/JoinScreen';
import WaitingLobby from './components/WaitingLobby';
import AnswerScreen from './components/AnswerScreen';
import FeedbackScreen from './components/FeedbackScreen';
import ScoreScreen from './components/ScoreScreen';
export default function App() {
    const { connected, message, send } = useWebSocket('ws://localhost:8080');
    const [appState, setAppState] = useState('join');
    const [playerId, setPlayerId] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [players, setPlayers] = useState([]);
    const [question, setQuestion] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [remaining, setRemaining] = useState(10000);
    const [answered, setAnswered] = useState(false);
    const [answeredChoiceIndex, setAnsweredChoiceIndex] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [earnedScore, setEarnedScore] = useState(0);
    const [, setQuizCode] = useState('');
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
                setQuestion(message.question);
                setCurrentQuestion(message.currentQ);
                setAnswered(false);
                setAnsweredChoiceIndex(null);
            }
        }
        else if (message.type === 'tick') {
            setRemaining(message.remaining);
        }
    }, [message]);
    const handleJoin = (code, name) => {
        // Generate a player ID (in real app, server would do this)
        const id = Math.random().toString(36).substring(2, 11);
        setPlayerId(id);
        setPlayerName(name);
        setQuizCode(code);
        setAppState('lobby');
        // Send join message
        send({
            type: 'join',
            quizCode: code,
            name: name
        });
    };
    const handleAnswer = (choiceIndex) => {
        if (answered)
            return;
        setAnswered(true);
        setAnsweredChoiceIndex(choiceIndex);
        // Determine if correct
        const correct = choiceIndex === question?.correctIndex;
        setIsCorrect(correct);
        // Calculate score (simplified, real logic should be from server)
        const score = correct ? Math.round(1000 + 500 * (remaining / 10000)) : 0;
        setEarnedScore(score);
        // Send answer
        send({
            type: 'answer',
            questionId: currentQuestion,
            choiceIndex: choiceIndex
        });
    };
    if (!connected) {
        return (_jsx("div", { className: "container", children: _jsxs("div", { className: "card", style: { textAlign: 'center' }, children: [_jsx("h1", { children: "Connecting to server..." }), _jsx("p", { style: { color: 'var(--text-secondary)', marginTop: '1rem' }, children: "Make sure the WebSocket server is running on ws://localhost:8080" })] }) }));
    }
    return (_jsxs(_Fragment, { children: [appState === 'join' && (_jsx(JoinScreen, { onJoin: handleJoin })), appState === 'lobby' && (_jsx(WaitingLobby, { playerName: playerName, playerCount: players.length })), appState === 'question' && question && (_jsx(AnswerScreen, { questionNumber: currentQuestion + 1, question: question, remaining: remaining, onAnswer: handleAnswer, answered: answered })), appState === 'feedback' && question && answeredChoiceIndex !== null && (_jsx(FeedbackScreen, { isCorrect: isCorrect, correctAnswer: question.choices[question.correctIndex || 0], yourAnswer: question.choices[answeredChoiceIndex], score: earnedScore })), appState === 'leaderboard' && (_jsx(ScoreScreen, { players: players, currentPlayerId: playerId }))] }));
}

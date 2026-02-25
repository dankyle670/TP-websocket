export type QuizPhase =
  | 'lobby'
  | 'question'
  | 'results'
  | 'leaderboard'
  | 'ended'

/*
=====================================
CLIENT → SERVER MESSAGES
=====================================
*/
export type ClientMessage =
  | { type: 'join'; quizCode: string; name: string }
  | { type: 'answer'; questionId: number; choiceIndex: number }
  | { 
      type: 'host:create'
      quizCode: string
      questions: Array<{
        text: string
        choices: string[]
        correctIndex: number
      }>
    }
  | { type: 'host:start' }
  | { type: 'host:next' }

/*
=====================================
SERVER → CLIENT MESSAGES
=====================================
*/
export type ServerMessage =
  | { type: 'state'; phase: QuizPhase }
  | { type: 'tick'; remaining: number }
  | { type: 'error'; message: string }
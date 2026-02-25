export type QuizPhase =
  | 'lobby'
  | 'question'
  | 'results'
  | 'leaderboard'
  | 'ended'

export type ClientMessage =
  | { type: 'join'; quizCode: string; name: string }
  | { type: 'answer'; questionId: number; choiceIndex: number }
  | { type: 'host:start' }
  | { type: 'host:next' }

export type ServerMessage =
  | { type: 'state'; phase: QuizPhase }
  | { type: 'tick'; remaining: number }
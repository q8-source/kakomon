export interface Question {
  id: number
  year: number
  subject: string
  questionNumber: number
  question: string
  choices: string[]
  correctAnswer: number
  explanation: string
}

export interface Answer {
  questionId: number
  selectedAnswer: number
  isCorrect?: boolean
}

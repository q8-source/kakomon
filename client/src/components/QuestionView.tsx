import { FC, useState, useEffect } from 'react'
import { Question, Answer } from '../types'
import './QuestionView.css'

const API_BASE = 'http://localhost:3001/api'

interface QuestionViewProps {
  question: Question
  questionIndex: number
  totalQuestions: number
  answer?: Answer
  onAnswerSubmit: (questionId: number, selectedAnswer: number) => void
  onNext: () => void
  onPrevious: () => void
  onFinish: () => void
  onBackToList: () => void
}

const QuestionView: FC<QuestionViewProps> = ({
  question,
  questionIndex,
  totalQuestions,
  answer,
  onAnswerSubmit,
  onNext,
  onPrevious,
  onFinish,
  onBackToList
}) => {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(answer?.selectedAnswer ?? null)
  const [submitted, setSubmitted] = useState(false)
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean
    correctAnswer: number
    explanation: string
  } | null>(null)

  useEffect(() => {
    setSelectedChoice(answer?.selectedAnswer ?? null)
    setSubmitted(false)
    setFeedback(null)
  }, [question.id, answer])

  const handleChoiceSelect = (index: number) => {
    if (!submitted) {
      setSelectedChoice(index)
    }
  }

  const handleSubmit = async () => {
    if (selectedChoice === null) return

    try {
      const response = await fetch(`${API_BASE}/submit-answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          questionId: question.id,
          answer: selectedChoice
        })
      })

      const result = await response.json()
      setFeedback(result)
      setSubmitted(true)
      onAnswerSubmit(question.id, selectedChoice)
    } catch (error) {
      console.error('Error submitting answer:', error)
    }
  }

  const handleNextQuestion = () => {
    setSelectedChoice(null)
    setSubmitted(false)
    setFeedback(null)
    onNext()
  }

  const handlePreviousQuestion = () => {
    setSelectedChoice(null)
    setSubmitted(false)
    setFeedback(null)
    onPrevious()
  }

  return (
    <div className="question-view">
      <div className="question-header">
        <button className="back-button" onClick={onBackToList}>
          ← 一覧に戻る
        </button>
        <div className="question-progress">
          問題 {questionIndex + 1} / {totalQuestions}
        </div>
      </div>

      <div className="question-content">
        <div className="question-meta">
          <span>{question.year}年</span>
          <span>{question.subject}</span>
          <span>問題{question.questionNumber}</span>
        </div>

        <h2 className="question-text">{question.question}</h2>

        <div className="choices">
          {question.choices.map((choice, index) => (
            <div
              key={index}
              className={`choice ${selectedChoice === index ? 'selected' : ''} ${
                submitted
                  ? index === feedback?.correctAnswer
                    ? 'correct'
                    : selectedChoice === index
                    ? 'incorrect'
                    : ''
                  : ''
              }`}
              onClick={() => handleChoiceSelect(index)}
            >
              <div className="choice-number">{index + 1}</div>
              <div className="choice-text">{choice}</div>
            </div>
          ))}
        </div>

        {feedback && (
          <div className={`feedback ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>
            <h3>{feedback.isCorrect ? '正解です！' : '不正解です'}</h3>
            <p className="explanation">{feedback.explanation}</p>
          </div>
        )}

        <div className="question-actions">
          <button
            className="nav-button"
            onClick={handlePreviousQuestion}
            disabled={questionIndex === 0}
          >
            ← 前の問題
          </button>

          {!submitted ? (
            <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={selectedChoice === null}
            >
              解答する
            </button>
          ) : (
            <>
              {questionIndex < totalQuestions - 1 ? (
                <button className="nav-button" onClick={handleNextQuestion}>
                  次の問題 →
                </button>
              ) : (
                <button className="finish-button" onClick={onFinish}>
                  結果を見る
                </button>
              )}
            </>
          )}

          {!submitted && questionIndex === totalQuestions - 1 && (
            <button className="finish-button" onClick={onFinish}>
              結果を見る
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuestionView

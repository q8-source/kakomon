import { FC } from 'react'
import { Question, Answer } from '../types'
import './QuestionList.css'

interface QuestionListProps {
  questions: Question[]
  answers: Answer[]
  onStartQuiz: (index: number) => void
}

const QuestionList: FC<QuestionListProps> = ({ questions, answers, onStartQuiz }) => {
  const getAnswerStatus = (questionId: number) => {
    const answer = answers.find(a => a.questionId === questionId)
    return answer ? '回答済み' : '未回答'
  }

  const isAnswered = (questionId: number) => {
    return answers.some(a => a.questionId === questionId)
  }

  return (
    <div className="question-list">
      <div className="list-header">
        <h2>問題一覧</h2>
        <p className="question-count">全{questions.length}問</p>
        {answers.length > 0 && (
          <p className="progress">進捗: {answers.length}/{questions.length}問</p>
        )}
      </div>

      {questions.length === 0 ? (
        <p className="no-questions">問題が見つかりません</p>
      ) : (
        <div className="questions">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className={`question-card ${isAnswered(question.id) ? 'answered' : ''}`}
            >
              <div className="question-info">
                <span className="question-meta">
                  {question.year}年 | {question.subject} | 問題{question.questionNumber}
                </span>
                <span className={`status ${isAnswered(question.id) ? 'answered' : 'unanswered'}`}>
                  {getAnswerStatus(question.id)}
                </span>
              </div>
              <p className="question-text">{question.question}</p>
              <button
                className="start-button"
                onClick={() => onStartQuiz(index)}
              >
                {isAnswered(question.id) ? '見直す' : '解く'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default QuestionList

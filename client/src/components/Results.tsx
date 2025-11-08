import { FC } from 'react'
import { Question, Answer } from '../types'
import './Results.css'

interface ResultsProps {
  questions: Question[]
  answers: Answer[]
  onRestart: () => void
  onReview: (index: number) => void
}

const Results: FC<ResultsProps> = ({ questions, answers, onRestart, onReview }) => {
  const calculateResults = () => {
    const results = questions.map((question, index) => {
      const answer = answers.find(a => a.questionId === question.id)
      const isCorrect = answer ? answer.selectedAnswer === question.correctAnswer : false
      return {
        question,
        index,
        answer,
        isCorrect
      }
    })

    const correctCount = results.filter(r => r.isCorrect).length
    const answeredCount = answers.length
    const totalCount = questions.length
    const score = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0

    return { results, correctCount, answeredCount, totalCount, score }
  }

  const { results, correctCount, answeredCount, totalCount, score } = calculateResults()

  const getScoreMessage = (score: number) => {
    if (score >= 90) return '素晴らしい成績です！'
    if (score >= 70) return '良い成績です！'
    if (score >= 50) return 'もう少しです！'
    return '復習して理解を深めましょう！'
  }

  return (
    <div className="results">
      <h2>結果</h2>

      <div className="score-summary">
        <div className="score-circle">
          <div className="score-value">{score}点</div>
          <div className="score-label">正答率</div>
        </div>
        <div className="score-details">
          <p className="score-message">{getScoreMessage(score)}</p>
          <p>正解: {correctCount} / {totalCount}問</p>
          <p>回答済み: {answeredCount} / {totalCount}問</p>
          {answeredCount < totalCount && (
            <p className="warning">未回答の問題があります</p>
          )}
        </div>
      </div>

      <div className="results-list">
        <h3>問題別結果</h3>
        {results.map(({ question, index, answer, isCorrect }) => (
          <div
            key={question.id}
            className={`result-item ${
              answer ? (isCorrect ? 'correct' : 'incorrect') : 'unanswered'
            }`}
          >
            <div className="result-info">
              <div className="result-status">
                {answer ? (isCorrect ? '○' : '×') : '−'}
              </div>
              <div className="result-details">
                <div className="result-meta">
                  {question.year}年 | {question.subject} | 問題{question.questionNumber}
                </div>
                <div className="result-question">{question.question}</div>
                {answer && (
                  <div className="result-answer">
                    あなたの解答: {answer.selectedAnswer + 1}番
                    {!isCorrect && ` (正解: ${question.correctAnswer + 1}番)`}
                  </div>
                )}
              </div>
            </div>
            <button className="review-button" onClick={() => onReview(index)}>
              見直す
            </button>
          </div>
        ))}
      </div>

      <div className="results-actions">
        <button className="restart-button" onClick={onRestart}>
          最初に戻る
        </button>
      </div>
    </div>
  )
}

export default Results

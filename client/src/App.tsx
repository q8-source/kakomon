import { useState, useEffect } from 'react'
import './App.css'
import QuestionList from './components/QuestionList'
import QuestionView from './components/QuestionView'
import Results from './components/Results'
import FilterPanel from './components/FilterPanel'
import { Question, Answer } from './types'

const API_BASE = 'http://localhost:3001/api'

function App() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ year: '', subject: '' })
  const [availableYears, setAvailableYears] = useState<number[]>([])
  const [availableSubjects, setAvailableSubjects] = useState<string[]>([])
  const [view, setView] = useState<'list' | 'question' | 'results'>('list')

  useEffect(() => {
    fetchMetadata()
    fetchQuestions()
  }, [])

  const fetchMetadata = async () => {
    try {
      const [yearsRes, subjectsRes] = await Promise.all([
        fetch(`${API_BASE}/years`),
        fetch(`${API_BASE}/subjects`)
      ])
      const years = await yearsRes.json()
      const subjects = await subjectsRes.json()
      setAvailableYears(years)
      setAvailableSubjects(subjects)
    } catch (error) {
      console.error('Error fetching metadata:', error)
    }
  }

  const fetchQuestions = async (year?: string, subject?: string) => {
    setLoading(true)
    try {
      let url = `${API_BASE}/questions`
      const params = new URLSearchParams()
      if (year) params.append('year', year)
      if (subject) params.append('subject', subject)
      if (params.toString()) url += `?${params.toString()}`

      const response = await fetch(url)
      const data = await response.json()
      setQuestions(data)
      setAnswers([])
      setCurrentQuestionIndex(null)
      setView('list')
    } catch (error) {
      console.error('Error fetching questions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (year: string, subject: string) => {
    setFilters({ year, subject })
    fetchQuestions(year, subject)
  }

  const handleStartQuiz = (index: number) => {
    setCurrentQuestionIndex(index)
    setView('question')
  }

  const handleAnswerSubmit = (questionId: number, selectedAnswer: number) => {
    const existingAnswerIndex = answers.findIndex(a => a.questionId === questionId)

    if (existingAnswerIndex >= 0) {
      const newAnswers = [...answers]
      newAnswers[existingAnswerIndex] = { ...newAnswers[existingAnswerIndex], selectedAnswer }
      setAnswers(newAnswers)
    } else {
      setAnswers([...answers, { questionId, selectedAnswer }])
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex !== null && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex !== null && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleFinish = () => {
    setView('results')
  }

  const handleRestart = () => {
    setAnswers([])
    setCurrentQuestionIndex(null)
    setView('list')
  }

  if (loading) {
    return (
      <div className="app">
        <div className="loading">読み込み中...</div>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="header">
        <h1>行政書士試験 過去問学習アプリ</h1>
      </header>

      <main className="main">
        {view === 'list' && (
          <>
            <FilterPanel
              years={availableYears}
              subjects={availableSubjects}
              selectedYear={filters.year}
              selectedSubject={filters.subject}
              onFilterChange={handleFilterChange}
            />
            <QuestionList
              questions={questions}
              answers={answers}
              onStartQuiz={handleStartQuiz}
            />
          </>
        )}

        {view === 'question' && currentQuestionIndex !== null && (
          <QuestionView
            question={questions[currentQuestionIndex]}
            questionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            answer={answers.find(a => a.questionId === questions[currentQuestionIndex].id)}
            onAnswerSubmit={handleAnswerSubmit}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onFinish={handleFinish}
            onBackToList={() => setView('list')}
          />
        )}

        {view === 'results' && (
          <Results
            questions={questions}
            answers={answers}
            onRestart={handleRestart}
            onReview={(index) => {
              setCurrentQuestionIndex(index)
              setView('question')
            }}
          />
        )}
      </main>
    </div>
  )
}

export default App

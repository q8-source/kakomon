import express from 'express';
import cors from 'cors';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Load questions data
let questions = [];

async function loadQuestions() {
  try {
    const data = await readFile(join(__dirname, 'data', 'questions.json'), 'utf-8');
    questions = JSON.parse(data);
    console.log(`Loaded ${questions.length} questions`);
  } catch (error) {
    console.error('Error loading questions:', error);
    questions = [];
  }
}

// Initialize questions on startup
loadQuestions();

// API Routes

// Get all questions or filter by parameters
app.get('/api/questions', (req, res) => {
  const { year, subject, limit } = req.query;

  let filteredQuestions = [...questions];

  if (year) {
    filteredQuestions = filteredQuestions.filter(q => q.year === parseInt(year));
  }

  if (subject) {
    filteredQuestions = filteredQuestions.filter(q => q.subject === subject);
  }

  if (limit) {
    filteredQuestions = filteredQuestions.slice(0, parseInt(limit));
  }

  res.json(filteredQuestions);
});

// Get a single question by ID
app.get('/api/questions/:id', (req, res) => {
  const question = questions.find(q => q.id === parseInt(req.params.id));

  if (!question) {
    return res.status(404).json({ error: 'Question not found' });
  }

  res.json(question);
});

// Get available years
app.get('/api/years', (req, res) => {
  const years = [...new Set(questions.map(q => q.year))].sort((a, b) => b - a);
  res.json(years);
});

// Get available subjects
app.get('/api/subjects', (req, res) => {
  const subjects = [...new Set(questions.map(q => q.subject))];
  res.json(subjects);
});

// Submit answer and get feedback
app.post('/api/submit-answer', (req, res) => {
  const { questionId, answer } = req.body;

  const question = questions.find(q => q.id === questionId);

  if (!question) {
    return res.status(404).json({ error: 'Question not found' });
  }

  const isCorrect = answer === question.correctAnswer;

  res.json({
    isCorrect,
    correctAnswer: question.correctAnswer,
    explanation: question.explanation
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

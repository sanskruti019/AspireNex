const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new quiz
router.post('/', async (req, res) => {
  const quiz = new Quiz(req.body);
  try {
    const newQuiz = await quiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a specific quiz
router.get('/:id', getQuiz, (req, res) => {
  res.json(res.quiz);
});

// Middleware to get quiz by ID
async function getQuiz(req, res, next) {
  let quiz;
  try {
    quiz = await Quiz.findById(req.params.id);
    if (quiz == null) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.quiz = quiz;
  next();
}

module.exports = router;
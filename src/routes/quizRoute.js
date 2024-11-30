import express from 'express';
import { auth } from '../middleware/auth.js';
import {    createQuiz,  deleteQuiz, getQuestionsByQuiz, getQuiz, getQuizById, updateQuiz } from '../controllers/quizController.js';

const QuizRoute = express.Router();

QuizRoute.post('/add/quiz',  createQuiz);
QuizRoute.get('/quizzes', getQuiz);
QuizRoute.get('/quiz/:id', getQuestionsByQuiz);
QuizRoute.put('/quiz/:id', auth, updateQuiz)
QuizRoute.delete('/quiz/:id', deleteQuiz);

export default QuizRoute;
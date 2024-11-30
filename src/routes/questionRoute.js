import express from 'express';
import { auth, isGrantedAccess } from '../middleware/auth.js';
import {  AddQuestion, createQuestionWithAnswers, deleteQuestion, getQuestion, updateQuestion } from '../controllers/questionController.js';
import { role } from '../../config/utils.js';

const QuestionRoute = express.Router();

QuestionRoute.post('/add/question',isGrantedAccess([role.TEACHER]),  createQuestionWithAnswers);
QuestionRoute.get('/questions', getQuestion);
QuestionRoute.put('/question/:id', auth, updateQuestion)
QuestionRoute.delete('/question/:id', deleteQuestion);

export default QuestionRoute;
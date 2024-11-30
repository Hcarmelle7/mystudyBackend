import express from 'express';
import { auth, isGrantedAccess } from '../middleware/auth.js';
import { role } from '../../config/utils.js';
import { AddAnswer, deleteAnswer, getAnswer, getAnswerbyQuestions, updateAnswer } from '../controllers/answerController.js';

const AnswerRoute = express.Router();

AnswerRoute.post('/add/answer/:id',isGrantedAccess([role.TEACHER]),  AddAnswer);
AnswerRoute.get('/answers', getAnswer);
AnswerRoute.put('/answer/:id', auth, updateAnswer)
AnswerRoute.delete('/answer/:id', deleteAnswer);
AnswerRoute.get('/answer/:id', getAnswerbyQuestions)

export default AnswerRoute;
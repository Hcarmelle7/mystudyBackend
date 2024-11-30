import express from 'express';
import { auth } from '../middleware/auth.js';
import {  AddScore, deleteScore, getScore } from '../controllers/scoreController.js';

const ScoreRoute = express.Router();

ScoreRoute.post('/add/score',  AddScore);
ScoreRoute.get('/scores', getScore);
ScoreRoute.delete('/score/:id', deleteScore);

export default ScoreRoute;
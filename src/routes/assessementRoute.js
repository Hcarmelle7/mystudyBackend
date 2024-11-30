import express from 'express';
import { auth } from '../middleware/auth.js';
import {  AddAssessement, deleteAssessement, getAssessement, updateAssessement } from '../controllers/assessementController.js';

const AssessementRoute = express.Router();

AssessementRoute.post('/add/assessement',  AddAssessement);
AssessementRoute.get('/assessements', getAssessement);
AssessementRoute.put('/assessement/:id', auth, updateAssessement)
AssessementRoute.delete('/assessement/:id', deleteAssessement);

export default AssessementRoute;
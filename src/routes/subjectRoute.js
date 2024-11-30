import express from 'express';
import { auth } from '../middleware/auth.js';
import {  AddSubject, deleteSubject, getSubject, updateSubject } from '../controllers/subjectController.js';

const SubjectRoute = express.Router();

SubjectRoute.post('/add/subject',  AddSubject);
SubjectRoute.get('/subjects', getSubject);
SubjectRoute.put('/subject/:id', auth, updateSubject)
SubjectRoute.delete('/subject/:id', deleteSubject);

export default SubjectRoute;
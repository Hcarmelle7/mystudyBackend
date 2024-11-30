import express from 'express';
import { auth, isGrantedAccess } from '../middleware/auth.js';
import { AddTeacher, deleteTeacher, getTeachers, updateTeacher } from '../controllers/teacherController.js';

const TeacherRoute = express.Router();

TeacherRoute.post('/add/teacher', auth, AddTeacher);
TeacherRoute.get('/teachers', getTeachers);
TeacherRoute.put('/teacher/:id', auth, updateTeacher)
TeacherRoute.delete('/teacher/:id', deleteTeacher);

export default TeacherRoute;
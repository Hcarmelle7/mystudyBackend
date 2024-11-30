import express from 'express';
import { AddStudent, deleteStudent, getStudent, updateStudent } from '../controllers/studentController.js';
import { auth, isGrantedAccess } from '../middleware/auth.js';
import { role } from '../../config/utils.js';

const StudentRoute = express.Router();

StudentRoute.post('/add/student', auth, AddStudent);
StudentRoute.get('/students', getStudent);
StudentRoute.put('/student/update', isGrantedAccess([role.STUDENT]),  updateStudent)
StudentRoute.delete('/student/:id', deleteStudent);

export default StudentRoute;
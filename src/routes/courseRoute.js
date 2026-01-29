import express from 'express';
import { auth } from '../middleware/auth.js';
import { AddCourse, deleteCourse, getCourse, updateCourse } from '../controllers/courseController.js';

const CourseRoute = express.Router();

CourseRoute.post('/add/classe', AddCourse);
CourseRoute.get('/classes', getCourse);
CourseRoute.put('/classe/:id', auth, updateCourse)
CourseRoute.delete('/classe/:id', deleteCourse);

export default CourseRoute;
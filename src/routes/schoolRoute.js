import express from 'express';
import { auth } from '../middleware/auth.js';
import { AddSchool, deleteSchool, getSchool, updateSchool } from '../controllers/schoolController.js';

const SchoolRoute = express.Router();

SchoolRoute.post('/add/school', auth, AddSchool);
SchoolRoute.get('/schools', getSchool);
SchoolRoute.put('/school/:id', auth, updateSchool)
SchoolRoute.delete('/school/:id', deleteSchool);

export default SchoolRoute;
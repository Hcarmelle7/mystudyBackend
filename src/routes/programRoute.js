import express from 'express';
import { auth } from '../middleware/auth.js';
import { AddSchool, deleteSchool, getSchool, updateSchool } from '../controllers/schoolController.js';
import { AddProgram, getProgram } from '../controllers/programController.js';

const ProgramRoute = express.Router();

ProgramRoute.post('/add/program', AddProgram);
ProgramRoute.get('/programs', getProgram);
// SchoolRoute.put('/school/:id', auth, updateSchool)
// SchoolRoute.delete('/school/:id', deleteSchool);

export default ProgramRoute;
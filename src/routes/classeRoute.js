import express from 'express';
import { auth, isGrantedAccess } from '../middleware/auth.js';
import { AddClasse, deleteClasse, getClasses, updateClasse } from '../controllers/classeController.js';
import { role } from '../../config/utils.js';

const ClasseRoute = express.Router();

ClasseRoute.post('/add/classe', isGrantedAccess([role.TEACHER]), AddClasse);
ClasseRoute.get('/classes', getClasses);
ClasseRoute.put('/classe/:id', auth, updateClasse)
ClasseRoute.delete('/classe/:id', deleteClasse);

export default ClasseRoute;
import express from 'express';
import { auth } from '../middleware/auth.js';
import { AddClasse, deleteClasse, getClasses, updateClasse } from '../controllers/classeController.js';

const ClasseRoute = express.Router();

ClasseRoute.post('/add/classe', AddClasse);
ClasseRoute.get('/classes', getClasses);
ClasseRoute.put('/classe/:id', auth, updateClasse)
ClasseRoute.delete('/classe/:id', deleteClasse);

export default ClasseRoute;
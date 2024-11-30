import express from 'express';
import { auth } from '../middleware/auth.js';
import {  AddLevel, deleteLevel, getLevel, updateLevel } from '../controllers/levelController.js';

const LevelRoute = express.Router();

LevelRoute.post('/add/level',  AddLevel);
LevelRoute.get('/levels', getLevel);
LevelRoute.put('/level/:id', auth, updateLevel)
LevelRoute.delete('/level/:id', deleteLevel);

export default LevelRoute;
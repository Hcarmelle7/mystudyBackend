import express from 'express';
import { Login, Register, getCurrentUser,  getUsers, getUsersId, updateProfile } from '../controllers/authController.js';
import { auth, isGrantedAccess } from '../middleware/auth.js';
import { role } from '../../config/utils.js';
import { idParam } from '../middleware/app.js';
import { getCountry } from '../controllers/countryController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login )
router.get('/users', getUsers);
router.get('/users/me', isGrantedAccess([role.USER]), getCurrentUser)
router.get('/users/:id', idParam, getUsersId);
router.patch('/profile/update', isGrantedAccess([role.USER]), upload.single('profilePicture'), updateProfile)
router.get('/country', auth, getCountry)

export default router;
  
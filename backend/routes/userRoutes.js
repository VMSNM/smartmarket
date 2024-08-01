import express from 'express';
import { getUserProfile, getUsers, loginUser, logoutUser, signupUser, updateUser } from '../controllers/userController.js';
import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router();

router.get('/user/:query', getUserProfile);
router.get('/all', protectRoute, getUsers);
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', protectRoute, logoutUser);
router.post('/update', protectRoute, updateUser);

export default router;
import express from 'express';
import protectRoute from '../middlewares/protectRoute.js';
import { addToViewed, getViewedByUser } from '../controllers/viewedController.js';

const router = express.Router();

router.get('/user/:id', protectRoute, getViewedByUser);
router.post('/addticker', protectRoute, addToViewed);

export default router;
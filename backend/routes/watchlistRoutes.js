import express from 'express';
import protectRoute from '../middlewares/protectRoute.js';
import { addRemoveFromWatchlist, createWatchlist, deleteWatchlist, getUserWatchlists, getWatchlist, updateTickerData, updateWatchlist } from '../controllers/watchlistController.js';

const router = express.Router();

router.get('/:id', protectRoute, getWatchlist);
router.get('/user/:username', protectRoute, getUserWatchlists);
router.post('/create', protectRoute, createWatchlist);
router.delete('/delete/:id', protectRoute, deleteWatchlist);
router.put('/update/:id', protectRoute, updateWatchlist);
router.put('/update-tickerdata/:id', protectRoute, updateTickerData);
router.put('/addremoveticker/:id', protectRoute, addRemoveFromWatchlist);

export default router;
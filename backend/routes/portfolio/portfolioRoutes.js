import express from 'express';
import { addRemoveFromPortfolio, createPortfolio, deletePortfolio, getHoldingPriceAction, getPortfolio, getUserPortfolios, updateHoldingData, updatePortfolio } from '../../controllers/portfolio/portfolioController.js';
import protectRoute from '../../middlewares/protectRoute.js';

const router = express.Router();

router.get('/:id', protectRoute, getPortfolio);
router.get('/user/:username', protectRoute, getUserPortfolios);
router.get('/:ticker/priceaction', protectRoute, getHoldingPriceAction);
router.post('/create', protectRoute, createPortfolio);
router.delete('/delete/:id', protectRoute, deletePortfolio);
router.put('/update/:id', protectRoute, updatePortfolio);
router.put('/addremoveticker/:id', protectRoute, addRemoveFromPortfolio);
router.put('/update-holdingdata/:id', protectRoute, updateHoldingData);

export default router;
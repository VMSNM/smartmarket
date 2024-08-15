import express from 'express';
import protectRoute from '../middlewares/protectRoute.js';
import { getBalanceSheet, getCashflowStatement, getIncomeStatement, getKeyMetrics, getKeyMetricsFMP, getPriceAction, getPriceHistory } from '../controllers/stockdetailsController.js';

const router = express.Router();

router.get('/:ticker/priceaction', protectRoute, getPriceAction);
router.get('/:ticker/pricehistory', protectRoute, getPriceHistory);
router.get('/:ticker/keymetrics', protectRoute, getKeyMetrics);
router.get('/:ticker/incomestatement', protectRoute, getIncomeStatement);
router.get('/:ticker/balancesheet', protectRoute, getBalanceSheet);
router.get('/:ticker/cashflowstatement', protectRoute, getCashflowStatement);
router.get('/:ticker/keymetrics-fmp', protectRoute, getKeyMetricsFMP);

export default router;
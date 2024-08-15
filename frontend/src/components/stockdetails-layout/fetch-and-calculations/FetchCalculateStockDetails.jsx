import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useStockDetailsContext } from '../../../context/StockDetailsContext';
import { useAuthContext } from '../../../context/AuthContext';
import { useViewedContext } from '../../../context/ViewedContext';
import useGetViewedByUser from '../../../hooks/viewed-companies/useGetViewedByUser';
import useGetStockData from '../../../hooks/stockdetails/useGetStockData';
import useGetPriceAction from '../../../hooks/stockdetails/useGetPriceAction';
import { checkTicker } from '../CheckAndFetch';
import { useCommonModalContext } from '../../../context/CommonModalContext';
import { validateViewed } from './ValidateViewed';
import useAddToViewed from '../../../hooks/viewed-companies/useAddToViewed';
import { handleCalculations } from './HandleCalculations';
import { avaiableTickers } from '../../../utils/portfolios';
import useGetPriceHistory from '../../../hooks/stockdetails/useGetPriceHistory';

const FetchCalculateStockDetails = ({setLoading, setLimitReached, setDemoLocalAccountAlert}) => {
    const { ticker } = useParams();
    const { authUser } = useAuthContext();
    const { value: {setCommonModalOpen, setCommonModalContent}} = useCommonModalContext();
    const { value: { stockDetails, setStockDetails, clearStockDetailsStorage, keyMetrics, setKeyMetrics, setPillars10Metrics, baseDCFSetup, setBaseDCFSetup }} = useStockDetailsContext();
    const { incomeStatement, balanceSheet, cashflowStatement, keyMetricsFMP } = stockDetails;
    const { setViewedByUser, viewedLimit: {numberOfTickers}} = useViewedContext();
    
    const { getViewedByUser } = useGetViewedByUser();
    const { addToViewed } = useAddToViewed();

    const { getStockData } = useGetStockData();
    const { getPriceAction } = useGetPriceAction();
    const { getPriceHistory } = useGetPriceHistory();

    const tickers = avaiableTickers;

    const handleGetViewed = async () => {
        const viewed = await getViewedByUser(authUser?._id);
        const { validRequest, alreadyViewed} = validateViewed(viewed, setViewedByUser, ticker, numberOfTickers, setCommonModalContent, setCommonModalOpen, setLimitReached);

        if (!validRequest) return;
        if (!alreadyViewed) {
            const data = await addToViewed(ticker);
            if (data) setViewedByUser(data);
        } 
        checkTicker(setLoading, ticker, clearStockDetailsStorage, stockDetails, setStockDetails, getStockData, getPriceAction, getPriceHistory);
    }

    useEffect(() => {
        setDemoLocalAccountAlert(false);
        setLimitReached(false);

        if (authUser.role === 'guest') {
            handleGetViewed();
            return;
        }

        if (authUser.role === 'local') {
            let findTicker = tickers.find(item => item === ticker);
            if (!findTicker) {
                setDemoLocalAccountAlert(true);
                return;
            } 
        }
        checkTicker(setLoading, ticker, clearStockDetailsStorage, stockDetails, setStockDetails, getStockData, getPriceAction, getPriceHistory);
    }, [ticker]);

    useEffect(() => {
        if (incomeStatement && balanceSheet && cashflowStatement && keyMetricsFMP) {
            handleCalculations(incomeStatement, balanceSheet, cashflowStatement, keyMetricsFMP, keyMetrics, setKeyMetrics, setPillars10Metrics, baseDCFSetup, setBaseDCFSetup);
        }
    }, [incomeStatement, balanceSheet, cashflowStatement, keyMetricsFMP]);

    return null;
}

export default FetchCalculateStockDetails;


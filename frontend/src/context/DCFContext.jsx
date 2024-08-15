import { createContext, useContext, useEffect, useState } from "react";
import { useStockDetailsContext } from "./StockDetailsContext";

export const DCFContext = createContext();

export const useDCFContext = () => {
    return useContext(DCFContext);
}

export const DCFContextProvider = ({ children }) => {

    const { value: {stockDetails: {cashflowStatement}}} = useStockDetailsContext();

    const [assumptionsSetup, setAssumptionsSetup] = useState({
        baseMetric: 'freeCashflow',
        baseDate: 'lastYear',
        baseValue: 0,
        fcfGrowthLow: 0,
        fcfGrowthMid: 0,
        fcfGrowthHigh: 0,
        pfcfRatioLow: 0,
        pfcfRatioMid: 0,
        pfcfRatioHigh: 0,
        netIncomeGrowthLow: 0,
        netIncomeGrowthMid: 0,
        netIncomeGrowthHigh: 0,
        peRatioLow: 0,
        peRatioMid: 0,
        peRatioHigh: 0,
        sharesOutGrowthLow: 0,
        sharesOutGrowthMid: 0,
        sharesOutGrowthHigh: 0,
        discountRateLow: 10,
        discountRateMid: 10,
        discountRateHigh: 10,
        perpetualGRLow: 3,
        perpetualGRMid: 3,
        perpetualGRHigh: 3,
    });

    const resetAssumptionsSetup = () => {
        setAssumptionsSetup({
            baseMetric: 'freeCashflow',
            baseDate: 'lastYear',
            baseValue: cashflowStatement[0]?.freeCashFlow,
            fcfGrowthLow: 0,
            fcfGrowthMid: 0,
            fcfGrowthHigh: 0,
            pfcfRatioLow: 0,
            pfcfRatioMid: 0,
            pfcfRatioHigh: 0,
            netIncomeGrowthLow: 0,
            netIncomeGrowthMid: 0,
            netIncomeGrowthHigh: 0,
            peRatioLow: 0,
            peRatioMid: 0,
            peRatioHigh: 0,
            sharesOutGrowthLow: 0,
            sharesOutGrowthMid: 0,
            sharesOutGrowthHigh: 0,
            discountRateLow: 10,
            discountRateMid: 10,
            discountRateHigh: 10,
            perpetualGRLow: 3,
            perpetualGRMid: 3,
            perpetualGRHigh: 3,
        })
    }

    const [dcfIV, setDCFIV] = useState({})

    const resetDCFIV = () => {
        setDCFIV({
            currentPrice: null,
            PGR: {
                low: null,
                mid: null,
                high: null,
            },
            Multiple: {
                low: null,
                mid: null,
                high: null,
            }
        })
    }

    const [autoFill, setAutoFill] = useState(false);

    useEffect(() => {
        /* resetAssumptionsSetup(); */
        resetDCFIV();
    }, []);

    const value = {
        assumptionsSetup, setAssumptionsSetup, resetAssumptionsSetup,
        dcfIV, setDCFIV, resetDCFIV,
        autoFill, setAutoFill
    }
    
    return <DCFContext.Provider value={{value}}>
        {children}
    </DCFContext.Provider>
}
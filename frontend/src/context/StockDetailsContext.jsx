import { createContext, useContext, useState } from "react";

export const StockDetailsContext = createContext();

export const useStockDetailsContext = () => {
    return useContext(StockDetailsContext);
}

export const StockDetailsContextProvider = ({ children }) => {
    // STATES
    const [stockDetails, setStockDetails] = useState({
        tickerFeatured: localStorage.getItem('ticker-featured') || '',
        priceActionDates: JSON.parse(localStorage.getItem('priceaction-dates')) || null,
        priceActionPrices: JSON.parse(localStorage.getItem('priceaction-prices')) || null,
        keyMetrics: JSON.parse(localStorage.getItem('key-metrics')) || null,
        incomeStatement: JSON.parse(localStorage.getItem('income-statement')) || null,
        balanceSheet: JSON.parse(localStorage.getItem('balance-sheet')) || null,
        cashflowStatement: JSON.parse(localStorage.getItem('cashflow-statement')) || null,
        keyMetricsFMP: JSON.parse(localStorage.getItem('key-metrics-fmp')) || null
    });

    const [keyMetrics, setKeyMetrics] = useState({
        revenue: {
            revenueGrowth: {
                growth: [],
                cagr: 0,
                avg2YRS: 0,
                avg5YRS: 0
            },
            revenueAvg2YRS: 0,
            revenueAvg5YRS: 0,
        },
        netIncome: {
            netIncomeGrowth: {
                growth: [],
                cagr: 0,
                avg2YRS: 0,
                avg5YRS: 0
            },
            netIncomeMargins: {
                margins: [],
                avg2YRS: 0,
                avg5YRS: 0
            },
            netIncomeAvg2YRS: 0,
            netIncomeAvg5YRS: 0,
        },
        sharesOut: {
            sharesOutGrowth: {
                growth: [],
                cagr: 0,
                avg2YRS: 0,
                avg5YRS: 0
            },
            sharesOutAvg2YRS: 0,
            sharesOutAvg5YRS: 0,
        },
        fcf: {
            fcfGrowth: {
                growth: [],
                cagr: 0,
                avg2YRS: 0,
                avg5YRS: 0
            },
            fcfMargins: {
                margins: [],
                avg2YRS: 0,
                avg5YRS: 0
            },
            fcfAvg2YRS: 0,
            fcfAvg5YRS: 0,
        },
        totalLiabilities: {
            totalLiabilitiesGrowth: {
                growth: [],
                cagr: 0,
                avg2YRS: 0,
                avg5YRS: 0
            },
            totalLiabilitiesAvg2YRS: 0,
            totalLiabilitiesAvg5YRS: 0,
        },
        debtToEquity: {
            debtToEquityLastYR: 0,
            debtToEquityAvg2YRS: 0,
            debtToEquityAvg5YRS: 0,
        },
        roic: {
            roicLastYR: 0,
            roicAvg2YRS: 0,
            roicAvg5YRS: 0,
        },
        roa: {
            roaLastYR: 0,
            roaAvg2YRS: 0,
            roaAvg5YRS: 0,
        },
        peRatio: {
            peRatioLastYR: 0,
            peRatioAvg2YRS: 0,
            peRatioAvg5YRS: 0,
        },
        pfcfRatio: {
            pfcfRatioLastYR: 0,
            pfcfRatioAvg2YRS: 0,
            pfcfRatioAvg5YRS: 0,
        }
    });

    const [pillars10Metrics, setPillars10Metrics] = useState({
        revenueGrowth: null,
        netIncomeGrowth: null,
        sharesOutGrowth: null,
        fcfGrowth: null,
        roicAvg5YRS: null,
        roaAvg5YRS: null,
        ltlFCFRatio: null,
        debtToEquity: null,
        peRatio: null,
        pfcfRatio: null,
        totals: null
    });

    const [baseDCFSetup, setBaseDCFSetup] = useState({
        baseMetric: null,
        baseDate: null,
        baseValue: null,
        fcfGrowthLow: null,
        fcfGrowthMid: null,
        fcfGrowthHigh: null,
        pFCFRatioLow: null,
        pFCFRatioMid: null,
        pFCFRatioHigh: null,
        netIncomeGrowthLow: null,
        netIncomeGrowthMid: null,
        netIncomeGrowthHigh: null,
        peRatioLow: null,
        peRatioMid: null,
        peRatioHigh: null,
        sharesOutGrowthLow: null,
        sharesOutGrowthMid: null,
        sharesOutGrowthHigh: null,
        discountRateLow: null,
        discountRateMid: 10,
        discountRateHigh: null,
        perpetualGRLow: null,
        perpetualGRMid: 3,
        perpetualGRHigh: null,
    });
    // END STATES

    // FUNCTIONS
    const clearStockDetailsStorage = () => {
        localStorage.removeItem('ticker-featured');
        localStorage.removeItem('priceaction-dates');
        localStorage.removeItem('priceaction-prices');
        localStorage.removeItem('key-metrics');
        localStorage.removeItem('income-statement');
        localStorage.removeItem('balance-sheet');
        localStorage.removeItem('cashflow-statement');
        localStorage.removeItem('key-metrics-fmp');

        setStockDetails({
            ...stockDetails,
            tickerFeatured: '',
            priceActionDates: null,
            priceActionPrices: null,
            keyMetrics: null,
            incomeStatement: null,
            balanceSheet: null,
            cashflowStatement: null,
            keyMetricsFMP: null
        });

        setKeyMetrics({
            revenue: {
                revenueGrowth: {
                    growth: [],
                    avg2YRS: 0,
                    avg5YRS: 0
                },
                revenueAvg2YRS: 0,
                revenueAvg5YRS: 0,
            },
            netIncome: {
                netIncomeGrowth: {
                    growth: [],
                    avg2YRS: 0,
                    avg5YRS: 0
                },
                netIncomeMargins: {
                    margins: [],
                    avg2YRS: 0,
                    avg5YRS: 0
                },
                netIncomeAvg2YRS: 0,
                netIncomeAvg5YRS: 0,
            },
            sharesOut: {
                sharesOutGrowth: {
                    growth: [],
                    avg2YRS: 0,
                    avg5YRS: 0
                },
                sharesOutAvg2YRS: 0,
                sharesOutAvg5YRS: 0,
            },
            fcf: {
                fcfGrowth: {
                    growth: [],
                    avg2YRS: 0,
                    avg5YRS: 0
                },
                fcfMargins: {
                    margins: [],
                    avg2YRS: 0,
                    avg5YRS: 0
                },
                fcfAvg2YRS: 0,
                fcfAvg5YRS: 0,
            },
            totalLiabilities: {
                totalLiabilitiesGrowth: {
                    growth: [],
                    avg2YRS: 0,
                    avg5YRS: 0
                },
                totalLiabilitiesAvg2YRS: 0,
                totalLiabilitiesAvg5YRS: 0,
            },
            debtToEquity: {
                debtToEquityAvg2YRS: 0,
                debtToEquityAvg5YRS: 0,
            },
            roic: {
                roicAvg2YRS: 0,
                roicAvg5YRS: 0,
            },
            roa: {
                roaAvg2YRS: 0,
                roaAvg5YRS: 0,
            },
            peRatio: {
                peRatioAvg2YRS: 0,
                peRatioAvg5YRS: 0,
            },
            pfcfRatio: {
                pfcfRatioAvg2YRS: 0,
                pfcfRatioAvg5YRS: 0,
            }
        });

        setPillars10Metrics({
            revenueGrowth: null,
            netIncomeGrowth: null,
            sharesOutGrowth: null,
            fcfGrowth: null,
            roicAvg5YRS: null,
            roaAvg5YRS: null,
            ltlFCFRatio: null,
            debtToEquity: null,
            peRatio: null,
            pfcfRatio: null,
            totals: null,
        });
    }

    const updatePriceAction = () => {
        setStockDetails({
            ...stockDetails,
            priceActionDates: JSON.parse(localStorage.getItem('priceaction-dates')),
            priceActionPrices: JSON.parse(localStorage.getItem('priceaction-prices'))
        })
    }
    // END FUNCTIONS

    const value = {
        stockDetails, setStockDetails,
        keyMetrics, setKeyMetrics,
        pillars10Metrics, setPillars10Metrics,
        baseDCFSetup, setBaseDCFSetup,
        updatePriceAction,
        clearStockDetailsStorage,
    }

    return <StockDetailsContext.Provider value={{value}}>
        {children} 
    </StockDetailsContext.Provider>
}
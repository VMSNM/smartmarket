import { convertToNumberAndRound, dcfhighLow } from "../../utils/useful";

export const calculateBaseDCF = (incomeStatement, balanceSheet, cashflowStatement, keyMetricsFMP, keyMetrics, pillars10Metrics, baseDCFSetup, setBaseDCFSetup) => {

    const { fcf: { fcfGrowth }, netIncome: { netIncomeGrowth }, sharesOut: { sharesOutGrowth }, pfcfRatio, peRatio } = keyMetrics;

    const { min: fcfGrowthLow, avg: fcfGrowthAvg, max: fcfGrowthHigh } = dcfhighLow([fcfGrowth?.cagr, fcfGrowth?.avg2YRS, fcfGrowth?.avg5YRS]);

    const { min: netIncomeGrowthLow, avg: netIncomeGrowthAvg, max: netIncomeGrowthHigh } = dcfhighLow([netIncomeGrowth?.cagr, netIncomeGrowth?.avg2YRS, netIncomeGrowth?.avg5YRS]);
    
    const { min: sharesOutGrowthLow, avg: sharesOutGrowthAvg, max: sharesOutGrowthHigh } = dcfhighLow([sharesOutGrowth?.cagr, sharesOutGrowth?.avg2YRS, sharesOutGrowth?.avg5YRS]);

    const { min: pfcfRatioLow, avg: pfcfRatioAvg, max: pfcfRatioHigh } = dcfhighLow([pfcfRatio?.pfcfRatioLastYR, pfcfRatio?.pfcfRatioAvg2YRS, pfcfRatio?.pfcfRatioAvg5YRS]);

    const { min: peRatioLow, avg: peRatioAvg, max: peRatioHigh } = dcfhighLow([peRatio?.peRatioLastYR, peRatio?.peRatioAvg2YRS, peRatio?.peRatioAvg5YRS]);

    setBaseDCFSetup({
        baseMetric: 'freeCashflow',
        baseDate: 'lastYear',
        baseValue: cashflowStatement[0]?.freeCashFlow || 0,
        fcfGrowthLow: convertToNumberAndRound(fcfGrowthLow * 100) || 0,
        fcfGrowthMid: convertToNumberAndRound(fcfGrowth?.cagr * 100) || 0,
        fcfGrowthHigh: convertToNumberAndRound(fcfGrowthHigh * 100) || 0,
        pfcfRatioLow: convertToNumberAndRound(pfcfRatioLow),
        pfcfRatioMid: convertToNumberAndRound(pfcfRatioAvg),
        pfcfRatioHigh: convertToNumberAndRound(pfcfRatioHigh),
        netIncomeGrowthLow: convertToNumberAndRound(netIncomeGrowthLow * 100) || 0,
        netIncomeGrowthMid: convertToNumberAndRound(netIncomeGrowth?.cagr * 100) || 0,
        netIncomeGrowthHigh: convertToNumberAndRound(netIncomeGrowthHigh * 100) || 0,
        peRatioLow: convertToNumberAndRound(peRatioLow),
        peRatioMid: convertToNumberAndRound(peRatioAvg),
        peRatioHigh: convertToNumberAndRound(peRatioHigh),
        sharesOutGrowthLow: convertToNumberAndRound(sharesOutGrowthHigh * 100) || 0,
        sharesOutGrowthMid: convertToNumberAndRound(sharesOutGrowth?.cagr * 100) || 0,
        sharesOutGrowthHigh: convertToNumberAndRound(sharesOutGrowthLow * 100) || 0,
        discountRateLow: 10,
        discountRateMid: 10,
        discountRateHigh: 10,
        perpetualGRLow: 3,
        perpetualGRMid: 3,
        perpetualGRHigh: 3,
    });
}
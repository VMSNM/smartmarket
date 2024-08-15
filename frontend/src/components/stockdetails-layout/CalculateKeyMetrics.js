import { convertToNumberAndRound } from "../../utils/useful";

export const calculateKeyMetrics = (incomeStatement, balanceSheet, cashflowStatement, keyMetricsFMP, keyMetrics, setKeyMetrics) => {
    let cagrLength = incomeStatement?.length - 1;

    let revenueGrowth = calculateGrowth(incomeStatement, 'revenue');
    let revenueGrowthCAGR = calculateCAGR(incomeStatement[0]?.revenue, incomeStatement[cagrLength]?.revenue)
    let revenueGrowthAvg2YRS = (revenueGrowth[0] + revenueGrowth[1]) / 2;
    let revenueGrowthAvg5YRS = revenueGrowth?.reduce((total, element) => total + element, 0) / 4;
    let revenueAvg5Y = incomeStatement?.reduce((total, element) => total + element.revenue, 0) / 5;
    let revenueAvg2Y = (incomeStatement[0]?.revenue + incomeStatement[1]?.revenue) / 2;

    let netIncomeGrowth = calculateGrowth(incomeStatement, 'netIncome');
    let netIncomeGrowthCAGR = calculateCAGR(incomeStatement[0]?.netIncome, incomeStatement[cagrLength]?.netIncome)
    let netIncomeGrowthAvg2YRS = (netIncomeGrowth[0] + netIncomeGrowth[1]) / 2;
    let netIncomeGrowthAvg5YRS = netIncomeGrowth?.reduce((total, element) => total + element, 0) / 4
    let netIncomeMargins = incomeStatement?.map(element => element?.netIncome / element?.revenue);
    let netIncomeMarginsAvg2YRS = (netIncomeMargins[0] + netIncomeMargins[1]) / 2;
    let netIncomeMarginsAvg5YRS = netIncomeMargins?.reduce((total, element) => total + element, 0) / 5
    let netIncomeAvg5Y = incomeStatement.reduce((total, element) => total + element.netIncome, 0) / 5;
    let netIncomeAvg2Y = (incomeStatement[0].netIncome + incomeStatement[1].netIncome) / 2;

    let sharesOutGrowth = calculateGrowth(incomeStatement, 'sharesOut');
    let sharesOutGrowthCAGR = calculateCAGR(incomeStatement[0]?.weightedAverageShsOutDil, incomeStatement[cagrLength]?.weightedAverageShsOutDil)
    let sharesOutGrowthAvg2YRS = (sharesOutGrowth[0] + sharesOutGrowth[1]) / 2;
    let sharesOutGrowthAvg5YRS = sharesOutGrowth?.reduce((total, element) => total + element, 0) / 4
    let sharesOutAvg5Y = incomeStatement.reduce((total, element) => total + element.weightedAverageShsOutDil, 0) / 5;
    let sharesOutAvg2Y = (incomeStatement[0].weightedAverageShsOutDil + incomeStatement[1].weightedAverageShsOutDil) / 2;

    let fcfGrowth = calculateGrowth(cashflowStatement, 'fcf');
    let fcfGrowthCAGR = calculateCAGR(cashflowStatement[0]?.freeCashFlow, cashflowStatement[cagrLength]?.freeCashFlow)
    let fcfGrowthAvg2YRS = (fcfGrowth[0] + fcfGrowth[1]) / 2;
    let fcfGrowthAvg5YRS = fcfGrowth?.reduce((total, element) => total + element, 0) / 4
    let fcfMargins = cashflowStatement?.map((element, idx) => element?.freeCashFlow / incomeStatement[idx]?.revenue);
    let fcfMarginsAvg2YRS = (fcfMargins[0] + fcfMargins[1]) / 2;
    let fcfMarginsAvg5YRS = fcfMargins?.reduce((total, element) => total + element, 0) / 5
    let fcfAvg5Y = cashflowStatement.reduce((total, element) => total + element.freeCashFlow, 0) / 5;
    let fcfAvg2Y = (cashflowStatement[0].freeCashFlow + cashflowStatement[1].freeCashFlow) / 2;

    let totalLiabilitiesGrowth = calculateGrowth(balanceSheet, 'totalLiabilities');
    let totalLiabilitiesGrowthCAGR = calculateCAGR(balanceSheet[0]?.totalLiabilities, balanceSheet[cagrLength]?.totalLiabilities)
    let totalLiabilitiesGrowthAvg2YRS = (totalLiabilitiesGrowth[0] + totalLiabilitiesGrowth[1]) / 2;
    let totalLiabilitiesGrowthAvg5YRS = totalLiabilitiesGrowth?.reduce((total, element) => total + element, 0) / 4
    let totalLiabilitiesAvg5Y = balanceSheet.reduce((total, element) => total + element.totalLiabilities, 0) / 5;
    let totalLiabilitiesAvg2Y = (balanceSheet[0].totalLiabilities + balanceSheet[1].totalLiabilities) / 2;

    let debtToEquityLastYR = keyMetricsFMP[0]?.debtToEquity;
    let debtToEquityAvg5Y = keyMetricsFMP?.reduce((total, element) => total + element.debtToEquity, 0) / 5;
    let debtToEquityAvg2Y = (keyMetricsFMP[0]?.debtToEquity + keyMetricsFMP[1]?.debtToEquity) / 2;

    let roicLastYR = keyMetricsFMP[0]?.roic;
    let roicAvg5Y = keyMetricsFMP.reduce((total, element) => total + element.roic, 0) / 5;
    let roicAvg2Y = (keyMetricsFMP[0].roic + keyMetricsFMP[1].roic) / 2;

    let roaLastYR = keyMetricsFMP[0]?.roa;
    let roaAvg5Y = keyMetricsFMP.reduce((total, element) => total + element.returnOnTangibleAssets, 0) / 5;
    let roaAvg2Y = (keyMetricsFMP[0].returnOnTangibleAssets + keyMetricsFMP[1].returnOnTangibleAssets) / 2;

    let peRatioLastYR = keyMetricsFMP[0]?.peRatio;
    let peRatioAvg5Y = convertToNumberAndRound(keyMetricsFMP.reduce((total, element) => total + element.peRatio, 0) / 5);
    let peRatioAvg2Y = convertToNumberAndRound((keyMetricsFMP[0].peRatio + keyMetricsFMP[1].peRatio) / 2);

    let pfcfRatioLastYR = keyMetricsFMP[0]?.pfcfRatio;
    let pfcfRatioAvg5Y = convertToNumberAndRound(keyMetricsFMP.reduce((total, element) => total + element.pfcfRatio, 0) / 5);
    let pfcfRatioAvg2Y = convertToNumberAndRound((keyMetricsFMP[0].pfcfRatio + keyMetricsFMP[1].pfcfRatio) / 2);

    const keyMetricsReturn = ({
        ...keyMetrics,
        revenue: {
            revenueGrowth: {
                growth: revenueGrowth.reverse(),
                cagr: revenueGrowthCAGR,
                avg2YRS: revenueGrowthAvg2YRS,
                avg5YRS: revenueGrowthAvg5YRS
            },
            revenueAvg2YRS: revenueAvg2Y,
            revenueAvg5YRS: revenueAvg5Y
        },
        netIncome: {
            netIncomeGrowth: {
                growth: netIncomeGrowth.reverse(),
                cagr: netIncomeGrowthCAGR,
                avg2YRS: netIncomeGrowthAvg2YRS,
                avg5YRS: netIncomeGrowthAvg5YRS
            },
            netIncomeMargins: {
                margins: netIncomeMargins.reverse(),
                avg2YRS: netIncomeMarginsAvg2YRS,
                avg5YRS: netIncomeMarginsAvg5YRS
            },
            netIncomeAvg2YRS: netIncomeAvg2Y,
            netIncomeAvg5YRS: netIncomeAvg5Y
        },
        sharesOut: {
            sharesOutGrowth: {
                growth: sharesOutGrowth.reverse(),
                cagr: sharesOutGrowthCAGR,
                avg2YRS: sharesOutGrowthAvg2YRS,
                avg5YRS: sharesOutGrowthAvg5YRS
            },
            sharesOutAvg2YRS: sharesOutAvg2Y,
            sharesOutAvg5YRS: sharesOutAvg5Y
        },
        fcf: {
            fcfGrowth: {
                growth: fcfGrowth.reverse(),
                cagr: fcfGrowthCAGR,
                avg2YRS: fcfGrowthAvg2YRS,
                avg5YRS: fcfGrowthAvg5YRS
            },
            fcfMargins: {
                margins: fcfMargins.reverse(),
                avg2YRS: fcfMarginsAvg2YRS,
                avg5YRS: fcfMarginsAvg5YRS
            },
            fcfAvg2YRS: fcfAvg2Y,
            fcfAvg5YRS: fcfAvg5Y
        },
        totalLiabilities: {
            totalLiabilitiesGrowth: {
                growth: totalLiabilitiesGrowth.reverse(),
                cagr: totalLiabilitiesGrowthCAGR,
                avg2YRS: totalLiabilitiesGrowthAvg2YRS,
                avg5YRS: totalLiabilitiesGrowthAvg5YRS
            },
            totalLiabilitiesAvg2YRS: totalLiabilitiesAvg2Y,
            totalLiabilitiesAvg5YRS: totalLiabilitiesAvg5Y
        },
        debtToEquity: {
            debtToEquityLastYR,
            debtToEquityAvg2YRS: debtToEquityAvg2Y,
            debtToEquityAvg5YRS: debtToEquityAvg5Y,
        },
        roic: {
            roicLastYR,
            roicAvg2YRS: roicAvg2Y,
            roicAvg5YRS: roicAvg5Y,
        },
        roa: {
            roaLastYR,
            roaAvg2YRS: roaAvg2Y,
            roaAvg5YRS: roaAvg5Y,
        },
        peRatio: {
            peRatioLastYR,
            peRatioAvg2YRS: peRatioAvg2Y,
            peRatioAvg5YRS: peRatioAvg5Y,
        },
        pfcfRatio: {
            pfcfRatioLastYR,
            pfcfRatioAvg2YRS: pfcfRatioAvg2Y,
            pfcfRatioAvg5YRS: pfcfRatioAvg5Y,
        }
    });
    setKeyMetrics(keyMetricsReturn);
    return keyMetricsReturn;

}

const calculateGrowth = (dataArray, metric) => {
    let length = dataArray?.length - 1;
    let growthArray = dataArray?.map((element, idx) => {
        if (idx < length) {
            if (metric === 'revenue') {
                var nextElement = dataArray[idx + 1]?.revenue;
                let value = (element?.revenue - nextElement) / nextElement;
                return value;
            }
            if (metric === 'netIncome') {
                var nextElement = dataArray[idx + 1]?.netIncome;
                let value = (element?.netIncome - nextElement) / nextElement;
                return value;
            }
            if (metric === 'sharesOut') {
                var nextElement = dataArray[idx + 1]?.weightedAverageShsOutDil;
                let value = (element?.weightedAverageShsOutDil - nextElement) / nextElement;
                return value;
            }
            if (metric === 'fcf') {
                var nextElement = dataArray[idx + 1]?.freeCashFlow;
                let value = (element?.freeCashFlow - nextElement) / nextElement;
                return value;
            }
            if (metric === 'totalLiabilities') {
                var nextElement = dataArray[idx + 1]?.totalLiabilities;
                let value = (element?.totalLiabilities - nextElement) / nextElement;
                return value;
            }
        }
        return 0;
    });
    return growthArray;
}

const calculateCAGR = (lastValue, firstValue) => {
    let cagrBase = (lastValue / firstValue);
    let cagrExponencial = 1/5;
    let cagr = Math.pow(cagrBase, cagrExponencial) - 1;
    
    return cagr;
}
var totalScore = 0, totalChecks = 0, totalVeryGood = 0, totalGood = 0, totalAverage = 0, totalBad = 0, totalVeryBad = 0, timePeriod = 5;

export const calculate10PillarsScore = (incomeStatement, balanceSheet, cashflowStatement, keyMetricsFMP, keyMetrics, setPillars10Metrics) => {

    let lastValue = 0, firstValue = 0, avg2YRS = 0, avg5YRS = 0;
    totalScore = 0, totalChecks = 0, totalVeryGood = 0, totalGood = 0, totalAverage = 0, totalBad = 0, totalVeryBad = 0;

    // REVENUE
    lastValue = incomeStatement[0]?.revenue;
    firstValue = incomeStatement[incomeStatement?.length - 1]?.revenue;
    avg2YRS = keyMetrics?.revenue?.revenueAvg2YRS;
    avg5YRS = keyMetrics?.revenue?.revenueAvg5YRS;
    let revenueValue = calculateGrowth(lastValue, firstValue, avg2YRS, avg5YRS, true);
    let revenueScore = calculateScore(revenueValue, 'positive', 50, 35, 20, 0);
    let revenueCheck = calculateCheck(revenueValue, 'positive');
    let revenueRate = calculateRate(revenueScore);
    let revenue = { revenueValue, revenueCheck, revenueScore, revenueRate }
    updateTotals(revenueScore, revenueCheck);
    // END REVENUE
    
    // NET INCOME
    lastValue = incomeStatement[0]?.netIncome;
    firstValue = incomeStatement[incomeStatement?.length - 1]?.netIncome;
    avg2YRS = keyMetrics?.netIncome?.netIncomeAvg2YRS;
    avg5YRS = keyMetrics?.netIncome?.netIncomeAvg5YRS;
    let netIncomeValue = calculateGrowth(lastValue, firstValue, avg2YRS, avg5YRS);
    let netIncomeScore = calculateScore(netIncomeValue, 'positive', 40, 25, 10, 0);
    let netIncomeCheck = calculateCheck(netIncomeValue, 'positive');
    let netIncomeRate = calculateRate(netIncomeScore);
    let netIncome = { netIncomeValue, netIncomeCheck, netIncomeScore, netIncomeRate }
    updateTotals(netIncomeScore, netIncomeCheck);
    // END NET INCOME

    // SHARES OUT
    lastValue = incomeStatement[0]?.weightedAverageShsOutDil;
    firstValue = incomeStatement[incomeStatement?.length - 1]?.weightedAverageShsOutDil;
    avg2YRS = keyMetrics?.sharesOut?.sharesOutAvg2YRS;
    avg5YRS = keyMetrics?.sharesOut?.sharesOutAvg5YRS;
    let sharesOutValue = calculateGrowth(lastValue, firstValue, avg2YRS, avg5YRS);
    let sharesOutScore = calculateScore(sharesOutValue, 'negative', -5, -2.5, -1, 1);
    let sharesOutCheck = calculateCheck(sharesOutValue, 'negative', 0);
    let sharesOutRate = calculateRate(sharesOutScore);
    let sharesOut = { sharesOutValue, sharesOutCheck, sharesOutScore, sharesOutRate }
    updateTotals(sharesOutScore, sharesOutCheck);
    // END SHARES OUT

    // FCF
    lastValue = cashflowStatement[0]?.freeCashFlow;
    firstValue = cashflowStatement[cashflowStatement?.length - 1]?.freeCashFlow;
    avg2YRS = keyMetrics?.fcf?.fcfAvg2YRS;
    avg5YRS = keyMetrics?.fcf?.fcfAvg5YRS;
    let freeCashFlowValue = calculateGrowth(lastValue, firstValue, avg2YRS, avg5YRS);
    let freeCashFlowScore = calculateScore(freeCashFlowValue, 'positive', 40, 25, 10, 0);
    let freeCashFlowCheck = calculateCheck(freeCashFlowValue, 'positive');
    let freeCashFlowRate = calculateRate(freeCashFlowScore);
    let freeCashFlow = { freeCashFlowValue, freeCashFlowCheck, freeCashFlowScore, freeCashFlowRate }
    updateTotals(freeCashFlowScore, freeCashFlowCheck);
    // END FCF

    // ROIC
    let roicValue = keyMetrics?.roic?.roicAvg5YRS;
    let roicScore = calculateScore(roicValue, 'positive', 0.20, 0.15, 0.10, 0.05);
    let roicCheck = calculateCheck(roicValue, 'positive');
    let roicRate = calculateRate(roicScore);
    let roic = { roicValue, roicCheck, roicScore, roicRate }
    updateTotals(roicScore, roicCheck);
    // END ROIC

    // ROtA
    let roaValue = keyMetrics?.roa?.roaAvg5YRS;
    let roaScore = calculateScore(roaValue, 'positive', 0.15, 0.12, 0.08, 0.04);
    let roaCheck = calculateCheck(roaValue, 'positive');
    let roaRate = calculateRate(roaScore);
    let roa = { roaValue, roaCheck, roaScore, roaRate }
    updateTotals(roaScore, roaCheck);
    // END ROtA

    // LTL / 5YR Avg FCF < 5
    let fcfAvg5YRS = keyMetrics?.fcf?.fcfAvg5YRS;
    let ltlLastValue = balanceSheet[0]?.totalLiabilities;
    let ltlFCFValue = ltlLastValue / fcfAvg5YRS;
    let ltlFCFScore = calculateScore(ltlFCFValue, 'negative', 2, 4, 6, 8);
    let ltlFCFCheck = calculateCheck(ltlFCFValue, 'negative', 5);
    let ltlFCFRate = calculateRate(ltlFCFScore);
    let ltlFCF = { ltlFCFValue, ltlFCFCheck, ltlFCFScore, ltlFCFRate }
    updateTotals(ltlFCFScore, ltlFCFCheck);
    // END LTL / 5YR Avg FCF < 5

    // Debt To Equity
    let debtEquityValue = keyMetricsFMP[0]?.debtToEquity;
    let debtEquityScore = calculateScore(debtEquityValue, 'negative', 0.5, 1, 1.5, 2);
    let debtEquityCheck = calculateCheck(debtEquityValue, 'negative', 1);
    let debtEquityRate = calculateRate(debtEquityScore);
    let debtEquity = { debtEquityValue, debtEquityCheck, debtEquityScore, debtEquityRate }
    updateTotals(debtEquityScore, debtEquityCheck);
    // END Debt To Equity

    // PE Ratio
    lastValue = keyMetricsFMP[0]?.peRatio;
    avg5YRS = keyMetrics?.peRatio?.peRatioAvg5YRS;
    let historicValue = lastValue / avg5YRS;
    let peRatioValue = lastValue * historicValue;
    let peRatioScore = calculateScore(peRatioValue, 'negative', 15, 20, 25, 30);
    let peRatioCheck = calculateCheck(peRatioValue, 'negative', 20);
    let peRatioRate = calculateRate(peRatioScore);
    let peRatioFinal = { peRatioValue, peRatioCheck, peRatioScore, peRatioRate }
    updateTotals(peRatioScore, peRatioCheck);
    // END PE Ratio

    // PFCF Ratio
    lastValue = keyMetricsFMP[0]?.pfcfRatio;
    avg5YRS = keyMetrics?.pfcfRatio?.pfcfRatioAvg5YRS;
    historicValue = lastValue / avg5YRS;
    let pfcfRatioValue = lastValue * historicValue;
    let pfcfRatioScore = calculateScore(pfcfRatioValue, 'negative', 15, 20, 25, 30);
    let pfcfRatioCheck = calculateCheck(pfcfRatioValue, 'negative', 20);
    let pfcfRatioRate = calculateRate(pfcfRatioScore);
    let pfcfRatioFinal = { pfcfRatioValue, pfcfRatioCheck, pfcfRatioScore, pfcfRatioRate }
    updateTotals(pfcfRatioScore, pfcfRatioCheck);
    // END PFCF Ratio

    let totalRate;
    totalScore >= 8.5 ? totalRate = 'Very good' : totalScore >= 7 ? totalRate = 'Good' : totalScore >= 5 ? totalRate = 'Average' : totalScore >= 3 ? totalRate = 'Bad' : totalRate = 'Very bad';
    const totals = { totalScore, totalChecks, totalVeryGood, totalGood, totalAverage, totalBad, totalVeryBad, totalRate }

    
    const pillars10MetricsReturn = ({
        revenueGrowth: revenue,
        netIncomeGrowth: netIncome,
        sharesOutGrowth: sharesOut,
        fcfGrowth: freeCashFlow,
        roicAvg5YRS: roic,
        roaAvg5YRS: roa,
        ltlFCFRatio: ltlFCF,
        debtToEquity: debtEquity,
        peRatio: peRatioFinal,
        pfcfRatio: pfcfRatioFinal,
        totals: totals,
    });
    setPillars10Metrics(pillars10MetricsReturn);
    return pillars10MetricsReturn;
}


const calculateGrowth = (lastValue, firstValue) => {
    let cagrBase = (lastValue / firstValue);
    let cagrExponencial = 1/5;
    let cagr = Math.pow(cagrBase, cagrExponencial) - 1;
    
    return cagr * 100;
}

const calculateScore = (metricValue, positiveNegative, veryGood, good, avg, bad) => {
    let metricScore;

    if (positiveNegative === 'negative') {
        metricValue < veryGood ? metricScore = 1 : metricValue < good ? metricScore = 0.75 : metricValue < avg ? metricScore = 0.5 : metricValue < bad ? metricScore = 0.25 : metricScore = 0;
        return metricScore;
    }
    metricValue > veryGood ? metricScore = 1 : metricValue > good ? metricScore = 0.75 : metricValue > avg ? metricScore = 0.5 : metricValue > bad ? metricScore = 0.25 : metricScore = 0;
    return metricScore;
    
}

const calculateCheck = (metricValue, positiveNegative, minValue) => {
    let metricCheck;

    if (positiveNegative === 'negative') {
        metricValue < minValue ? metricCheck = 'True' : metricCheck = 'False';    
        return metricCheck;
    }
    metricValue > 0 ? metricCheck = 'True' : metricCheck = 'False';
    return metricCheck;
}

const calculateRate = (metricScore) => {
    let metricRate;
    metricScore == 1 ? metricRate = 'Very good' : metricScore == 0.75 ? metricRate = 'Good' : metricScore == 0.5 ? metricRate = 'Average' : metricScore == 0.25 ? metricRate = 'Bad' : metricRate = 'Very bad'
    return metricRate;
}

const updateTotals = (metricScore, metricCheck) => {
    totalScore += metricScore
    metricCheck === 'True' ? totalChecks += 1 : totalChecks += 0;
    metricScore == 1 ? totalVeryGood += 1 : metricScore == 0.75 ? totalGood += 1 : metricScore == 0.5 ? totalAverage += 1 : metricScore == 0.25 ? totalBad += 1 : totalVeryBad += 1;
}
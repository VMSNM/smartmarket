import { calculateBaseDCF } from "../CalculateBaseDCF";
import { calculateKeyMetrics } from "../CalculateKeyMetrics";
import { calculate10PillarsScore } from "../ScoreCalculations";

export const handleCalculations = (incomeStatement, balanceSheet, cashflowStatement, keyMetricsFMP, keyMetrics, setKeyMetrics, setPillars10Metrics, baseDCFSetup, setBaseDCFSetup) => {

    const keyMetricsReturn = calculateKeyMetrics(incomeStatement, balanceSheet, cashflowStatement, keyMetricsFMP, keyMetrics, setKeyMetrics);

    const pillars10MetricsReturn = calculate10PillarsScore(incomeStatement, balanceSheet, cashflowStatement, keyMetricsFMP, keyMetricsReturn, setPillars10Metrics);

    calculateBaseDCF(incomeStatement, balanceSheet, cashflowStatement, keyMetricsFMP, keyMetricsReturn, pillars10MetricsReturn, baseDCFSetup, setBaseDCFSetup);

}
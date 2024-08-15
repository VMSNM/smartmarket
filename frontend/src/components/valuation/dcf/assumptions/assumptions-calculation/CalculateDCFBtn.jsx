import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useDCFContext } from '../../../../../context/DCFContext';
import { useStockDetailsContext } from '../../../../../context/StockDetailsContext';

const CalculateDCFBtn = () => {

  const { value: { stockDetails: { incomeStatement, balanceSheet }}} = useStockDetailsContext();
  const { value: { assumptionsSetup, dcfIV, setDCFIV }} = useDCFContext();

  const handleCalculateDCF = () => {
    calculateDCF(assumptionsSetup, incomeStatement, balanceSheet, dcfIV, setDCFIV);
  }

  return (
    <Button 
      variant='outlined' 
      sx={{fontWeight:'bold'}}
      onClick={handleCalculateDCF}
    >
        Calculate
    </Button>
  )
}

export default CalculateDCFBtn;

const calculateDCF = (assumptionsSetup, incomeStatement, balanceSheet, dcfIV, setDCFIV) => {
  let baseValue = assumptionsSetup?.baseValue;
  let baseMetric = assumptionsSetup?.baseMetric;

  let sharesOutGrowth = { 
    low: assumptionsSetup?.sharesOutGrowthLow / 100,
    mid: assumptionsSetup?.sharesOutGrowthMid / 100, 
    high: assumptionsSetup?.sharesOutGrowthHigh / 100,
  }

  let discountRate = { 
    low: assumptionsSetup?.discountRateLow / 100,
    mid: assumptionsSetup?.discountRateMid / 100, 
    high: assumptionsSetup?.discountRateHigh / 100,
  }

  let perpetualGR = { 
    low: assumptionsSetup?.perpetualGRLow / 100,
    mid: assumptionsSetup?.perpetualGRMid / 100, 
    high: assumptionsSetup?.perpetualGRHigh / 100,
  }

  let netCashPosition = balanceSheet[0]?.cashAndShortTermInvestments - balanceSheet[0]?.totalDebt;

  if (baseMetric === 'freeCashflow') {
    let fcfGrowth = { 
      low: assumptionsSetup?.fcfGrowthLow / 100,
      mid: assumptionsSetup?.fcfGrowthMid / 100, 
      high: assumptionsSetup?.fcfGrowthHigh / 100,
    }

    let fcfMultiple = { 
      low: assumptionsSetup?.pfcfRatioLow,
      mid: assumptionsSetup?.pfcfRatioMid, 
      high: assumptionsSetup?.pfcfRatioHigh,
    }

    const shareValueDCF = dcfValue(baseValue, fcfGrowth, incomeStatement[0]?.weightedAverageShsOutDil, sharesOutGrowth, discountRate, perpetualGR, fcfMultiple, netCashPosition, dcfIV, setDCFIV);
    return
  }

  if (baseMetric === 'netIncome') {
    let netIncomeGrowth = { 
      low: assumptionsSetup?.netIncomeGrowthLow / 100,
      mid: assumptionsSetup?.netIncomeGrowthMid / 100, 
      high: assumptionsSetup?.netIncomeGrowthHigh / 100,
    }

    let netIncomeMultiple = { 
      low: assumptionsSetup?.peRatioLow,
      mid: assumptionsSetup?.peRatioMid, 
      high: assumptionsSetup?.peRatioHigh,
    }

    const shareValueDCF = dcfValue(baseValue, netIncomeGrowth, incomeStatement[0]?.weightedAverageShsOutDil, sharesOutGrowth, discountRate, perpetualGR, netIncomeMultiple, netCashPosition, dcfIV, setDCFIV);

    return
  }
}

const dcfValue = (baseValue, metricGrowth, currentShares, sharesOutGrowth, discountRate, perpetualGR, multipleValue, netCashPosition, dcfIV, setDCFIV) => {
  
  // LOW ASSUMPTIONS
  let metricYear5Low = baseValue * Math.pow(1 + metricGrowth?.low, 5);
  let sharesYear5Low = currentShares * Math.pow(1 + sharesOutGrowth?.low, 5);
  let pgrFinalValueLow = metricYear5Low * (1+discountRate?.low)/(discountRate?.low-perpetualGR?.low)
  let multipleFinalValueLow = metricYear5Low * multipleValue?.low;
  let shareValuePGRLow = (pgrFinalValueLow + netCashPosition) / sharesYear5Low;
  let shareValueMultipleLow = (multipleFinalValueLow + netCashPosition) / sharesYear5Low;

  // MID ASSUMPTIONS
  let metricYear5Mid = baseValue * Math.pow(1 + metricGrowth?.mid, 5);
  let sharesYear5Mid = currentShares * Math.pow(1 + sharesOutGrowth?.mid, 5);
  let pgrFinalValueMid = metricYear5Mid * (1+discountRate?.mid)/(discountRate?.mid-perpetualGR?.mid)
  let multipleFinalValueMid = metricYear5Mid * multipleValue?.mid;
  let shareValuePGRMid = (pgrFinalValueMid + netCashPosition) / sharesYear5Mid;
  let shareValueMultipleMid = (multipleFinalValueMid + netCashPosition) / sharesYear5Mid;

  // HIGH ASSUMPTIONS
  let metricYear5High = baseValue * Math.pow(1 + metricGrowth?.high, 5);
  let sharesYear5High = currentShares * Math.pow(1 + sharesOutGrowth?.high, 5);
  let pgrFinalValueHigh = metricYear5High * (1+discountRate?.high)/(discountRate?.high-perpetualGR?.high)
  let multipleFinalValueHigh = metricYear5High * multipleValue?.high;
  let shareValuePGRHigh = (pgrFinalValueHigh + netCashPosition) / sharesYear5High;
  let shareValueMultipleHigh = (multipleFinalValueHigh + netCashPosition) / sharesYear5High;

  setDCFIV({
    ...dcfIV,
    PGR: {
      low: shareValuePGRLow,
      mid: shareValuePGRMid,
      high: shareValuePGRHigh
    },
    Multiple: {
      low: shareValueMultipleLow,
      mid: shareValueMultipleMid,
      high: shareValueMultipleHigh
    }
  })

  const shareValueDCF = { shareValuePGRLow, shareValueMultipleLow, shareValuePGRMid, shareValueMultipleMid, shareValuePGRHigh, shareValueMultipleHigh }

  return shareValueDCF;
}
import React, { useState } from 'react';
import DCFHistoricalData from './historical-data/DCFHistoricalData';
import DCFAssumptions from './assumptions/DCFAssumptions';
import { DCFContextProvider } from '../../../context/DCFContext';
import { useStockDetailsContext } from '../../../context/StockDetailsContext';

const DCF = () => {
  const { value: {stockDetails: { balanceSheet }, keyMetrics: { netIncome, sharesOut, fcf, pfcfRatio, peRatio }}} = useStockDetailsContext();
  
  return (
    <>
      { balanceSheet && netIncome && sharesOut && fcf && pfcfRatio && peRatio && (
      <>
        <DCFContextProvider>
          <DCFHistoricalData />
          <DCFAssumptions />
        </DCFContextProvider>
      </>
      )}
    </>
  )
}

export default DCF;
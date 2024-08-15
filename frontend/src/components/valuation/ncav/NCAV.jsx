import React, { useState } from 'react';
import NCAVTable from './ncav-table/NCAVTable';
import NNWCTable from './nnwc-table/NNWCTable';
import { useStockDetailsContext } from '../../../context/StockDetailsContext';

const DCF = () => {
  const { value: {stockDetails: { incomeStatement, balanceSheet }}} = useStockDetailsContext();

  return (
    <>
      { incomeStatement && balanceSheet && (
      <>
        <NCAVTable />
        <NNWCTable />
      </>
      )}
    </>
  )
}

export default DCF;
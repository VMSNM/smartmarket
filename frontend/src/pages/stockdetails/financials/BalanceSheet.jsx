import React from 'react';
import { BodyTextTitle } from '../../../styles/main';
import { Colors } from '../../../styles/theme';
import BalanceSheetTable from '../../../components/financials/balance-sheet/BalanceSheetTable';
import BalanceSheetChart from '../../../components/financials/balance-sheet/BalanceSheetChart';
import { useStockDetailsContext } from '../../../context/StockDetailsContext';

const IncomeStatement = () => {
  const { value: { stockDetails: { balanceSheet }, keyMetrics}} = useStockDetailsContext();

  return (
    <>
      { balanceSheet && keyMetrics && (
      <>
        <BodyTextTitle variant='h3' wantedColor={Colors.primary}>Balance Sheet Data</BodyTextTitle>
        <BalanceSheetChart />
        <BalanceSheetTable />
      </>
      )}
    </>
  )
}

export default IncomeStatement;
import React from 'react';
import { BodyTextTitle } from '../../../styles/main';
import IncomeStatementTable from '../../../components/financials/income-statement/IncomeStatementTable';
import { Colors } from '../../../styles/theme';
import IncomeStatementChart from '../../../components/financials/income-statement/IncomeStatementChart';
import { useStockDetailsContext } from '../../../context/StockDetailsContext';

const IncomeStatement = () => {
  const { value: { stockDetails: { incomeStatement }, keyMetrics}} = useStockDetailsContext();

  return (
    <>
      { incomeStatement && keyMetrics && (
      <>
        <BodyTextTitle variant='h3' wantedColor={Colors.primary}>Income Statement Data</BodyTextTitle>
        <IncomeStatementChart />
        <IncomeStatementTable />
      </>
      )}
    </>
  )
}

export default IncomeStatement;
import React from 'react';
import { BodyTextTitle } from '../../../styles/main';
import { Colors } from '../../../styles/theme';
import CashflowStatementTable from '../../../components/financials/cashflow-statement/CashflowStatementTable';
import CashflowStatementChart from '../../../components/financials/cashflow-statement/CashflowStatementChart';
import { useStockDetailsContext } from '../../../context/StockDetailsContext';

const IncomeStatement = () => {
  const { value: { stockDetails: { cashflowStatement }, keyMetrics}} = useStockDetailsContext();

  return (
    <>
      { cashflowStatement && keyMetrics && (
      <>
        <BodyTextTitle variant='h3' wantedColor={Colors.primary}>Cashflow Statement Data</BodyTextTitle>
        <CashflowStatementChart />
        <CashflowStatementTable />
      </>
      )}
    </>
  )
}

export default IncomeStatement;
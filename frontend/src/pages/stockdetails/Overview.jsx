import * as React from 'react';
import { LoadingBox, TitleText } from '../../styles/main';
import { CircularProgress, Divider } from '@mui/material';
import Table10PillarsData from '../../components/overview/table10pillars-data/Table10PillarsData';
import { useStockDetailsContext } from '../../context/StockDetailsContext';
import Table10PillarsScore from '../../components/overview/table10pillars-score/Table10PillarsScore';

export default function Overview() {
  const { value: { stockDetails, keyMetrics, pillars10Metrics }} = useStockDetailsContext();
  const { incomeStatement, balanceSheet, cashflowStatement } = stockDetails;

  return (
    <>
      <TitleText variant='h3'>Overview</TitleText>
      <Divider sx={{marginTop:'5px', marginBottom:'40px'}} />
      
      { !incomeStatement || !balanceSheet || !cashflowStatement || !keyMetrics || !pillars10Metrics && (
        <LoadingBox>
          <CircularProgress /> 
        </LoadingBox>
      )}
      { incomeStatement && balanceSheet && cashflowStatement && keyMetrics && pillars10Metrics && (
        <>
        <Table10PillarsData />
        <Divider sx={{marginTop:'15px', marginBottom:'15px', border: 'none'}} />
        <Table10PillarsScore />
        </>
      )}
    </>
  );
}

import { Box, Switch } from '@mui/material'
import React, { useEffect } from 'react'
import { BodyText } from '../../../styles/main'
import { useStockDetailsContext } from '../../../context/StockDetailsContext';
import { useTablesActionBtnsContext } from '../../../context/TablesActionBtnsContext';

const Table10PillarsDataReverseBtn = ({ setIncomeStatementUI, setBalanceSheetUI, setCashflowStatementUI, setKeyMetricsFMPUI, reversed, setReversed }) => {

    const { value: { stockDetails, keyMetrics }} = useStockDetailsContext();
    const { incomeStatement, balanceSheet, cashflowStatement, keyMetricsFMP } = stockDetails;
    const { setShowGrowth, setShowMargins } = useTablesActionBtnsContext();

    const handleReverseData = () => {
        if (reversed) {
            setIncomeStatementUI(incomeStatement.slice(0));
            setBalanceSheetUI(balanceSheet.slice(0));
            setCashflowStatementUI(cashflowStatement.slice(0));
            setKeyMetricsFMPUI(keyMetricsFMP.slice(0));
            setShowGrowth(false);
            setShowMargins(false);
            return;
        }
        setIncomeStatementUI(incomeStatement.slice(0).reverse());
        setBalanceSheetUI(balanceSheet.slice(0).reverse());
        setCashflowStatementUI(cashflowStatement.slice(0).reverse());
        setKeyMetricsFMPUI(keyMetricsFMP.slice(0).reverse());
    }

    useEffect(() => {
        handleReverseData();
    }, [reversed]);
  
    return (
        <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
            <BodyText variant='body2' onClick={() => setReversed(!reversed)}>Reverse data</BodyText>
            <Switch 
                checked={reversed} 
                size='small'
                onChange={() => setReversed(!reversed)} 
                inputProps={{ 'aria-label': 'controlled' }}
            />
        </Box>
    )
}

export default Table10PillarsDataReverseBtn
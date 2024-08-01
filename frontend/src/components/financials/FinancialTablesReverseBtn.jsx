import { Box, Switch } from '@mui/material'
import React, { useEffect } from 'react'
import { BodyText } from '../../styles/main';
import { useTablesActionBtnsContext } from '../../context/TablesActionBtnsContext';

const FinancialTablesReverseBtn = ({ financialStatement, setFinancialStatementUI, reversed, setReversed }) => {
    const { setShowGrowth, setShowMargins } = useTablesActionBtnsContext();

    const handleReverseData = () => {
        if (reversed) {
            setFinancialStatementUI(financialStatement.slice(0));
            setShowGrowth(false);
            setShowMargins(false);
            return;
        }
        setFinancialStatementUI(financialStatement.slice(0).reverse());
        
    }

    useEffect(() => {
        handleReverseData();
    }, [reversed]);
  
    return (
        <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
            <BodyText variant='body2' onClick={() => setReversed(!reversed)}>Reverse Table Data</BodyText>
            <Switch 
                checked={reversed} 
                size='small'
                onChange={() => setReversed(!reversed)} 
                inputProps={{ 'aria-label': 'controlled' }}
            />
        </Box>
    )
}

export default FinancialTablesReverseBtn;
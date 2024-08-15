import { CircularProgress } from '@mui/material'
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import SaveIcon from '@mui/icons-material/Save';
import { BodyText, FormPrimaryActionBtn } from '../../../../../styles/main';

const ActionBtn = ({inputs, setInputs, handleUpdateHoldingData, tickerSymbol, loadingUpdateHoldingData}) => {
    const { sharesCount, avgBuyPrice } = inputs;

    const validateData = () => {
        if (tickerSymbol === '' || sharesCount === '' | avgBuyPrice === '') {
            toast.error('All fields required');
            return;
        }
        if (sharesCount <= 0) {
            toast.error('Shares number must be at least 1');
            setInputs({...inputs, sharesCount: 1})
            return;
        }
        if (avgBuyPrice <= 0) {
            toast.error('Average price must be above 0');
            setInputs({...inputs, avgBuyPrice: 1})
            return;
        }
        handleUpdateHoldingData();
    }
    
    return (
        <>
        <FormPrimaryActionBtn
            disabled={loadingUpdateHoldingData}
            title={`Update Position`} 
            variant="outlined" 
            startIcon={<SaveIcon />}
            onClick={validateData}
        >
            {loadingUpdateHoldingData ? <CircularProgress size="1.5rem" /> : <BodyText variant='body2'>Update Position</BodyText> }            
        </FormPrimaryActionBtn>
        </>
    )
}

export default ActionBtn;


import { CircularProgress } from '@mui/material'
import React, { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import toast from 'react-hot-toast';
import { BodyText, FormPrimaryActionBtn } from '../../../../../styles/main';

const ActionBtn = ({inputs, setInputs, handleAddRemoveFromPortfolio, loadingAddRemove }) => {
    const {tickerSymbol, sharesCount, avgBuyPrice} = inputs;

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
        handleAddRemoveFromPortfolio();
    }
    
    return (
        <>
        <FormPrimaryActionBtn
            disabled={loadingAddRemove}
            title={`Add Position`} 
            variant="outlined" 
            startIcon={<AddCircleOutlineIcon />}
            onClick={validateData}
        >
            {loadingAddRemove ? <CircularProgress size="1.5rem" /> : <BodyText variant='body2'>Add Position</BodyText> }            
        </FormPrimaryActionBtn>
        </>
    )
}

export default ActionBtn;
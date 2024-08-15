import React from 'react';
import SaveIcon from '@mui/icons-material/Save';
import toast from 'react-hot-toast';
import { BodyText, FormPrimaryActionBtn } from '../../../../styles/main';
import { CircularProgress } from '@mui/material';

const ActionBtn = ({inputs, setInputs, handleUpdateTickerData, loadingUpdateTickerData}) => {

    const validateData = () => {
        if (inputs?.input1 < 0 || inputs.input1 === '') {
          setInputs({...inputs, input1: 0});
          toast.error('Price target must be at least 0.00$');
          return;
        } 
        handleUpdateTickerData();
    }

    return (
        <FormPrimaryActionBtn
            disabled={loadingUpdateTickerData}
            title={'Update ticker'} 
            variant="outlined" 
            startIcon={<SaveIcon />}
            onClick={validateData}
        >
            {loadingUpdateTickerData ? <CircularProgress size="1.5rem" /> : <BodyText variant='body2'>Update ticker</BodyText> }
        </FormPrimaryActionBtn>
    )
}

export default ActionBtn
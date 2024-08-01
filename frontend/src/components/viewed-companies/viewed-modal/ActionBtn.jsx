import React from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { BodyText, FormPrimaryActionBtn } from '../../../styles/main';

const ActionBtn = () => {

    return (
        <FormPrimaryActionBtn
            disabled={true}
            title={'Upgrade plan'} 
            variant="outlined" 
            startIcon={<SaveIcon />}
        >
            <BodyText variant='body2'>Upgrade plan</BodyText>
        </FormPrimaryActionBtn>
    )
}

export default ActionBtn
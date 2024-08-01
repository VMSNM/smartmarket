import { IconButton } from '@mui/material';
import React from 'react';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { blue } from '@mui/material/colors';
import { Colors } from '../../../../../styles/theme';

const AddNewHolding = ({openModalCreateNewHolding}) => {
  return (
    <IconButton
        variant='contained'
        title={`Add new transaction / holding`} 
        onClick={openModalCreateNewHolding}
    >
        {/* {loading ? <CircularProgress size="1.5rem" /> : <BodyText variant='body2'>Create watchlist</BodyText> } */}
        <AddCircleOutline 
            sx={{
                fontSize:'32px',
                color: Colors.primary, 
                transition: '.8s all', 
                ':hover': { color: blue[500] }
            }}  
        />
    </IconButton>
  )
}

export default AddNewHolding
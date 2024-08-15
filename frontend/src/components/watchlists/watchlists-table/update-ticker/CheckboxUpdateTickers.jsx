import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { BodyText } from '../../../../styles/main';

export default function CheckboxUpdateTickers({tickerSymbol, inputs, setInputs}) {
  const handleChange = () => {
    setInputs({...inputs, checkboxSelected: !inputs?.checkboxSelected})
  }
  return (
    <FormGroup>
      <FormControlLabel 
        control={
          <Checkbox />
        } 
        label={
          <BodyText variant='caption'>Update {tickerSymbol} ticker on all watchlists it appears</BodyText>
        }
        checked={inputs?.checkboxSelected || false}
        onChange={handleChange}
        inputprops={{ 'aria-label': 'controlled' }}
        sx={{fontSize:'0.6rem'}}
      />
    </FormGroup>
  );
}
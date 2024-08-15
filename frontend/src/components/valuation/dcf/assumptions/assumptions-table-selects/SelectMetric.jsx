import * as React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useDCFContext } from '../../../../../context/DCFContext';

export default function SelectMetric() {

  const { value: { assumptionsSetup, setAssumptionsSetup, setAutoFill }} = useDCFContext();

  const handleChange = (e) => {
    const { value } = e.target;
    setAssumptionsSetup({
      ...assumptionsSetup,
      baseMetric: value
    });
    setAutoFill(false);
  };

  return (
    <FormControl sx={{ m: 0, my: 1, minWidth: 80 }} size="small">
        <InputLabel id="demo-select-small-label">Metric</InputLabel>
        <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={assumptionsSetup?.baseMetric}
            label={`Metric to use on DCF`}
            onChange={handleChange}
            sx={{fontSize:'14px', fontWeight:'500', paddingY: '5px'}}
        >
            <MenuItem value={'freeCashflow'}>Free Cashflow</MenuItem>
            <MenuItem value={'netIncome'}>Net Income</MenuItem>
        </Select>
    </FormControl>
  );
}

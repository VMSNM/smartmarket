import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CustomTableCell } from '../../../../styles/main';

export default function NNWCTableSelectDR({nnwcDR, setNNWCDR, discountName, baseDiscountRate}) {
  const [discountRate, setDiscountRate] = React.useState(baseDiscountRate);

  const handleChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { name, value } = e.target;
    setDiscountRate(value);
    setNNWCDR({
        ...nnwcDR,
        [name]: value
    })
  };

  return (
    <CustomTableCell>
        <FormControl sx={{ m: 0, minWidth: 80 }} size="small">
        {/* <InputLabel id="demo-select-small-label"></InputLabel> */}
        <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={discountRate}
            label={`${discountName} Discount Rate`}
            name={discountName}
            onChange={handleChange}
            sx={{fontSize:'12px', fontWeight:'500'}}
        >
            <MenuItem value={0}>0%</MenuItem>
            <MenuItem value={0.25}>25%</MenuItem>
            <MenuItem value={0.50}>50%</MenuItem>
            <MenuItem value={0.75}>75%</MenuItem>
            <MenuItem value={1}>100%</MenuItem>
        </Select>
        </FormControl>
    </CustomTableCell>
  );
}

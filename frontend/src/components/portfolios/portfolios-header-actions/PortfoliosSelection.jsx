import React, { useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { usePortfoliosContext } from '../../../context/PortfoliosContext';

const PortfoliosSelection = () => {
    const { value: {portfolios, portfolioSelected, setPortfolioSelected}} = usePortfoliosContext();

    const handleChange = (e) => {
        const { value } = e.target;
        setPortfolioSelected(value)
    };

    /* if (portfolios?.length === 0) return; */

    return (
        <FormControl sx={{ m: 0, my: 1, minWidth: 200 }} size="small">
            <InputLabel id="demo-select-small-label">Portfolios</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={portfolioSelected || ''}
                label={`Portfolios`}
                disabled={portfolios?.length === 0 ? true : false}
                onChange={handleChange}
                sx={{fontSize:'14px', fontWeight:'500', paddingY: '5px'}}
            >
                { portfolios?.map((element, idx) => (
                    <MenuItem key={idx} value={element._id}>{element.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default PortfoliosSelection
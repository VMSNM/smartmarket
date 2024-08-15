import React, { useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { usePortfoliosContext } from '../../../context/PortfoliosContext';

const PortfoliosTypeSelection = () => {

    const { value: {portfolioType, setPortfolioType}} = usePortfoliosContext();

    const handleChange = (e) => {
        const { value } = e.target;
        setPortfolioType(value)
    };

    /* if (portfolios?.length === 0) return; */

    return (
        <FormControl sx={{ m: 0, my: 1, minWidth: 200 }} size="small">
            <InputLabel id="demo-select-small-label">Portfolio Type</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={portfolioType || ''}
                label={`Portfolio Type`}
                onChange={handleChange}
                sx={{fontSize:'14px', fontWeight:'500', paddingY: '5px'}}
            >
                <MenuItem value={'Beginner Setup'}>Beginner Setup</MenuItem>
                <MenuItem value={'Advanced Setup'} disabled={true}>Advanced Setup</MenuItem>
            </Select>
        </FormControl>
    )
}

export default PortfoliosTypeSelection
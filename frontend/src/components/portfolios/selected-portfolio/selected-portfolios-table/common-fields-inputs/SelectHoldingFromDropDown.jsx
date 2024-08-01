import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { avaiableTickers } from '../../../../../utils/portfolios';
import { usePortfoliosContext } from '../../../../../context/PortfoliosContext';

const SelectHoldingFromDropDown = ({inputs, setInputs}) => {
    const { value: {portfolios, portfolioSelected}} = usePortfoliosContext();
    const tickers = avaiableTickers;

    const handleChange = (e) => {
        const { value } = e.target;
        setInputs({...inputs, tickerSymbol: value});
    };
    
    return (
        <FormControl required sx={{ m: 0, my: 1, minWidth: 200 }} size="small">
            <InputLabel id="demo-select-small-label">Ticker Symbol</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={inputs?.tickerSymbol}
                label={`Ticker symbol`}
                onChange={handleChange}
                sx={{fontSize:'14px', fontWeight:'500', paddingY: '5px'}}
            >
                { tickers?.map((ticker, idx) => (
                    <MenuItem 
                        key={idx} 
                        value={ticker}
                        disabled={portfolios?.find(element => element._id === portfolioSelected)?.tickers.some(item => item.symbol === ticker)}
                    >
                        {ticker}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default SelectHoldingFromDropDown
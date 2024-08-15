import { Box } from '@mui/material'
import React, { useState } from 'react'
import { PriceActionChartButton } from '../../../styles/stockdetails-layout/priceactionchart';
import { useStockDetailsContext } from '../../../context/StockDetailsContext';

const PriceActionChartNavBtns = ({setChartDates, setChartPrices}) => {
  const { value: { stockDetails: { priceActionDates, priceActionPrices }}} = useStockDetailsContext();
  const [chartIdx, setChartIdx] = useState('all');

  const handleChartIdx = (idx) => {
    setChartIdx(idx);
    if (idx === '1') {
      setChartDates([...priceActionDates].reverse().slice(0,7).reverse());
      setChartPrices([...priceActionPrices].reverse().slice(0,7).reverse());
      return;
    }
    if (idx === '2') {
      setChartDates([...priceActionDates].reverse().slice(0,25).reverse());
      setChartPrices([...priceActionPrices].reverse().slice(0,25).reverse());
      return;
    }
    if (idx === '3') {
      setChartDates([...priceActionDates].reverse().slice(0,250).reverse());
      setChartPrices([...priceActionPrices].reverse().slice(0,250).reverse());
      return;
    }
    if (idx === 'all') {
      setChartDates([...priceActionDates].slice(0,1300));
      setChartPrices([...priceActionPrices].slice(0,1300));
      return;
    }
  }

  return (
    <Box display={'flex'} width={'100%'} justifyContent={'center'} flexWrap={'wrap'} mt={2} mb={2} gap={2}>
        <PriceActionChartButton variant={chartIdx === '1' ? 'contained' : 'outlined'} onClick={() => handleChartIdx('1')}>
          1 week
        </PriceActionChartButton>
        
        <PriceActionChartButton variant={chartIdx === '2' ? 'contained' : 'outlined'} onClick={() => handleChartIdx('2')}>
          1 month
        </PriceActionChartButton>
        
        <PriceActionChartButton variant={chartIdx === '3' ? 'contained' : 'outlined'} onClick={() => handleChartIdx('3')}>
          1 year
        </PriceActionChartButton>
        
        <PriceActionChartButton variant={chartIdx === 'all' ? 'contained' : 'outlined'} onClick={() => handleChartIdx('all')}>
          5 years
        </PriceActionChartButton>
    </Box>
  )
}

export default PriceActionChartNavBtns;
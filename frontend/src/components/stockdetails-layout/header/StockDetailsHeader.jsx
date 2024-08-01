import { Box, CircularProgress, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { LoadingBox } from '../../../styles/main';
import { useStockDetailsContext } from '../../../context/StockDetailsContext';
import TickerName from './TickerName';
import TickerPrice from './TickerPrice';
import TickerScore from './TickerScore';
import TickerIntrinsicValue from './TickerIntrinsicValue';
import TickerWatchlist from './ticker-watchlist/TickerWatchlist';

const StockDetailsHeader = () => {
  const [loading, setLoading] = useState(true);
  
  const { value: { stockDetails: { priceActionPrices }, pillars10Metrics: { totals }}} = useStockDetailsContext();

  useEffect(() => {
    if (priceActionPrices && totals) setLoading(false);
  }, [priceActionPrices, totals]);
  
  return (
    <>
      { loading && (
        <LoadingBox sx={{width: '100%', height: '40px', display:'flex', justifyContent:'center'}}>
          <CircularProgress /> 
        </LoadingBox>
      )}
      { !loading && priceActionPrices && (
        <Box display={'flex'} justifyContent={'space-between'}>
          <Stack gap={2} justifyContent={'space-between'}>
            <Stack direction={'row'} gap={1} alignItems={'center'}>
              <TickerName />
              <TickerWatchlist />
            </Stack>

            <TickerPrice />
          </Stack>

          <Stack gap={1}>
            <TickerScore />
            <TickerIntrinsicValue />
          </Stack>
        </Box>
      )}
    </>
  )
}

export default StockDetailsHeader;
import { CircularProgress, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BodyText, BodyTextTitle, LoadingBox } from '../../../../../styles/main'
import useGetTickerPrice from '../../../../../hooks/stockdetails/useGetTickerPrice';
import { useStockDetailsContext } from '../../../../../context/StockDetailsContext';
import { USDollar2Dig } from '../../../../../utils/useful';
import { Colors } from '../../../../../styles/theme';

const CurrentPrice = () => {
    const { value: {stockDetails: {priceActionPrices}}} = useStockDetailsContext();
    
    const { loadingTickerPrice, getTickerPrice } = useGetTickerPrice();
    const [currentPrice, setCurrentPrice] = useState(null);

    useEffect(() => {
        if (priceActionPrices) {
            setCurrentPrice(getTickerPrice());
        };
    }, [priceActionPrices]);

    return (
        <>
        { loadingTickerPrice && (
            <LoadingBox>
                <CircularProgress sx={{width: '40px', height: '40px'}} /> 
            </LoadingBox>
        )}
        { !loadingTickerPrice && (
            <Stack direction={'row'}>
                <BodyTextTitle variant='subtitle2'>
                    Current price: <span style={{color: Colors.secondary}}>{USDollar2Dig.format(currentPrice)}</span>
                </BodyTextTitle>
          </Stack>
        )}
        </>
    )
}

export default CurrentPrice
import React from 'react'
import { KeyMetricsPriceRangeBox } from '../../../styles/stockdetails-layout/keymetrics'
import { BodyText, BodyTextTitle } from '../../../styles/main'
import { Box, Stack } from '@mui/material'
import { Colors } from '../../../styles/theme'
import { USDollar2Dig, convertToNumberAndRound } from '../../../utils/useful'
import { useStockDetailsContext } from '../../../context/StockDetailsContext'

const KeyMetricsPriceRange = ({keyMetrics}) => {
  const { value: {stockDetails: { priceActionPrices }}} = useStockDetailsContext();
  let nowPrice, lowRange, highRange, totalRange, lowRangeSize, highRangeSize = 0;

  if (priceActionPrices !== null) {
    nowPrice = convertToNumberAndRound(priceActionPrices[priceActionPrices?.length - 1]);

    lowRange = convertToNumberAndRound(keyMetrics['52WeekLow']);
    highRange = convertToNumberAndRound(keyMetrics['52WeekHigh']);
    totalRange = highRange - lowRange;
    
    lowRangeSize = convertToNumberAndRound((nowPrice - lowRange) / totalRange * 100);
    highRangeSize = convertToNumberAndRound((highRange - nowPrice) / totalRange * 100);
  }

  return (
    <KeyMetricsPriceRangeBox mt={2} px={2} py={1} alignItems={'center'} >
        <BodyTextTitle variant='subtitle2' wantedColor={Colors.secondary}>52 Week Range</BodyTextTitle>

        <Stack>
          <Stack direction={'row'} justifyContent={'right'} alignItems={'center'}>
            <Box 
              width={`${lowRangeSize}%`} 
              height={'3px'} 
              borderRadius={'2px'} 
              sx={{background: Colors.secondaryBG, boxShadow: `0px 0px 4px ${Colors.black}`}} 
            />

            <Box 
              width={'20px'} 
              height={'19px'} 
              sx={{background: Colors.lightgreen, boxShadow: `0px 0px 2px ${Colors.black}`, borderRadius: '50%', marginRight:'1px', marginLeft:'1px'}} 
            />

            <Box 
              width={`${highRangeSize}%`}
              height={'3px'} 
              borderRadius={'2px'} 
              sx={{background: Colors.primaryBG, boxShadow: `0px 0px 4px ${Colors.black}`}} 
            />
          </Stack>
          
          <Stack direction={'row'} justifyContent={'space-between'}>
            <BodyText variant='caption'>{USDollar2Dig.format(lowRange)}</BodyText>
            <BodyText variant='caption'>{USDollar2Dig.format(highRange)}</BodyText>
          </Stack>
        </Stack>
    </KeyMetricsPriceRangeBox>
  )
}

export default KeyMetricsPriceRange
import React from 'react';
import { SubtitleText, TitleText } from '../../../styles/main';
import { useStockDetailsContext } from '../../../context/StockDetailsContext';

const TickerName = () => {
    const { value: { stockDetails: { keyMetrics }}} = useStockDetailsContext();

    return (
        <>
            <TitleText variant='h2'>
                {keyMetrics?.Symbol} <span className='hide-on-mobile'>-</span>
            </TitleText>
            <SubtitleText variant='subtitle1' className='hide-on-mobile'>
                {keyMetrics?.Name}
            </SubtitleText>
        </>
            
    )
}

export default TickerName
import React, { useEffect, useState } from 'react'
import { TickerPriceStack } from '../../../styles/stockdetails-layout/header';
import { SubtitleText, TitleText } from '../../../styles/main';
import { Percent, USDollar2Dig } from '../../../utils/useful';
import { Colors } from '../../../styles/theme';
import { useStockDetailsContext } from '../../../context/StockDetailsContext';

const TickerPrice = ({}) => {
    const { value: { stockDetails: { priceActionPrices }}} = useStockDetailsContext();

    const [stockPrice, setStockPrice] = useState(0);
    const [stockPriceChangeValue, setStockPriceChangeValue] = useState(0);
    const [stockPriceChangePerc, setStockPriceChangePerc] = useState(0);

    useEffect(() => {
        if (priceActionPrices !== null) {
            checkTickerPrice(priceActionPrices, setStockPrice, setStockPriceChangeValue, setStockPriceChangePerc);
        }
    }, [priceActionPrices]);

    return (

        <TickerPriceStack>
            <TitleText variant='h2' wantedColor={Colors.secondary}>{USDollar2Dig.format(stockPrice)}</TitleText>
            <SubtitleText 
            variant='subtitle1' 
            wantedColor={stockPriceChangeValue < 0 ? Colors.danger : Colors.success }>
                {USDollar2Dig.format(stockPriceChangeValue)} ({Percent(stockPriceChangePerc)})
            </SubtitleText>
        </TickerPriceStack>
    )
}

export default TickerPrice;

const checkTickerPrice = (priceActionPrices, setStockPrice, setStockPriceChangeValue, setStockPriceChangePerc) => {
    let todayPrice = priceActionPrices[priceActionPrices.length -1];
    let yesterdayPrice = priceActionPrices[priceActionPrices.length -2];
    let changeValue = priceActionPrices[priceActionPrices.length -1] - priceActionPrices[priceActionPrices.length -2];
    let changePercentage = ((todayPrice - yesterdayPrice) / yesterdayPrice) * 100;
    setStockPrice(todayPrice);
    setStockPriceChangeValue(changeValue);
    setStockPriceChangePerc(changePercentage);
}
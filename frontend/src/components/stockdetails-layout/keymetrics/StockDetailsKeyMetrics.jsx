import React from 'react'
import { Colors } from '../../../styles/theme'
import { KeyMetricsBox } from '../../../styles/stockdetails-layout/keymetrics'
import { LoadingBox, SubtitleText } from '../../../styles/main'
import StockDetailsKeyMetric from './StockDetailsKeyMetric';
import KeyMetricsPriceRange from './KeyMetricsPriceRange';
import { useStockDetailsContext } from '../../../context/StockDetailsContext';
import { CircularProgress } from '@mui/material';
import { Percent, USDollar2Dig, USDollarCompact } from '../../../utils/useful';

const StockDetailsKeyMetrics = () => {
  const { value: { stockDetails: { keyMetrics }}} = useStockDetailsContext();

  return (
    <>
      { !keyMetrics && (
        <LoadingBox sx={{width: '100%', display:'flex', justifyContent:'center'}}>
          <CircularProgress /> 
        </LoadingBox>
      )}
      { keyMetrics && (
        <>
        <SubtitleText variant='subtitle1' mb={1}>Key Metrics</SubtitleText>
        <KeyMetricsBox>
            <StockDetailsKeyMetric 
              rowIdx={'1'} 
              withBorder={true} 
              metricTitle={'Mkt Cap:'} 
              titleColor={Colors.secondary} 
              metricBody={USDollarCompact.format(keyMetrics?.MarketCapitalization)} 
            />
            <StockDetailsKeyMetric 
              rowIdx={'1'} 
              metricTitle={'PE Ratio:'} 
              titleColor={Colors.secondary} 
              metricBody={keyMetrics?.PERatio} 
            />

            <StockDetailsKeyMetric 
              rowIdx={'2'} 
              withBorder={true} 
              metricTitle={'Trailing PE:'} 
              titleColor={Colors.primary} 
              metricBody={keyMetrics?.TrailingPE} 
            />
            <StockDetailsKeyMetric 
              rowIdx={'2'} 
              metricTitle={'Forward PE:'} 
              titleColor={Colors.primary} 
              metricBody={keyMetrics?.ForwardPE} 
            />

            <StockDetailsKeyMetric 
              rowIdx={'1'} 
              withBorder={true} 
              metricTitle={'PEG Ratio:'} 
              titleColor={Colors.secondary} 
              metricBody={keyMetrics?.PEGRatio} 
            />
            <StockDetailsKeyMetric 
              rowIdx={'1'} 
              metricTitle={'PB Ratio:'} 
              titleColor={Colors.secondary} 
              metricBody={keyMetrics?.PriceToBookRatio} 
            />

            <StockDetailsKeyMetric 
              rowIdx={'2'} 
              withBorder={true} 
              metricTitle={'ROA:'} 
              titleColor={Colors.primary} 
              metricBody={Percent(keyMetrics?.ReturnOnAssetsTTM * 100)} 
            />
            <StockDetailsKeyMetric 
              rowIdx={'2'} 
              metricTitle={'ROE:'} 
              titleColor={Colors.primary} 
              metricBody={Percent(keyMetrics?.ReturnOnEquityTTM * 100)} 
            />

            <StockDetailsKeyMetric 
              rowIdx={'1'} 
              withBorder={true} 
              metricTitle={'EPS:'} 
              titleColor={Colors.secondary} 
              metricBody={USDollar2Dig.format(keyMetrics?.EPS)} 
            />
            <StockDetailsKeyMetric 
              rowIdx={'1'} 
              metricTitle={'Shares Out:'} 
              titleColor={Colors.secondary} 
              metricBody={keyMetrics?.SharesOutstanding / 1000} 
            />

            <StockDetailsKeyMetric 
              rowIdx={'2'} 
              withBorder={true} 
              metricTitle={'Op. Margin:'} 
              titleColor={Colors.primary} 
              metricBody={Percent(keyMetrics?.OperatingMarginTTM * 100)} 
            />
            <StockDetailsKeyMetric 
              rowIdx={'2'} 
              metricTitle={'Net Margin:'} 
              titleColor={Colors.primary} 
              metricBody={Percent(keyMetrics?.ProfitMargin * 100)} 
            />

            <StockDetailsKeyMetric 
              rowIdx={'1'} 
              withBorder={true} 
              metricTitle={'P/Targ:'} 
              titleColor={Colors.secondary} 
              metricBody={keyMetrics?.AnalystTargetPrice} 
            />
            <StockDetailsKeyMetric 
              rowIdx={'1'} 
              metricTitle={'Div Yield:'} 
              titleColor={Colors.secondary} 
              metricBody={Percent(keyMetrics?.DividendYield * 100)} 
            />
        </KeyMetricsBox>
        
        <KeyMetricsPriceRange keyMetrics={keyMetrics} />
        </>
      )}
    </>
  )
}

export default StockDetailsKeyMetrics;
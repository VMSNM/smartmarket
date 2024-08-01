import React from 'react'
import { KeyMetricField } from '../../../styles/stockdetails-layout/keymetrics'
import { BodyText, BodyTextTitle } from '../../../styles/main'

const StockDetailsKeyMetric = ({rowIdx, withBorder, metricTitle, titleColor, metricBody}) => {
  return (
    <KeyMetricField rowIdx={rowIdx} withBorder={withBorder}>
        <BodyTextTitle variant='caption' wantedColor={titleColor}>{metricTitle}</BodyTextTitle>
        <BodyText variant='caption'>{metricBody}</BodyText>
    </KeyMetricField>
  )
}

export default StockDetailsKeyMetric;
import { Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BodyTextTitle } from '../../../../../styles/main'
import { Colors } from '../../../../../styles/theme'
import { useStockDetailsContext } from '../../../../../context/StockDetailsContext'
import { useDCFContext } from '../../../../../context/DCFContext'
import DCFChart from './DCFChart'
import DCFChartSelection from './DCFChartSelection'

const DCFChartSection = () => {

    const { value: { stockDetails: { incomeStatement, cashflowStatement }}} = useStockDetailsContext();
    const { value: { assumptionsSetup }} = useDCFContext();

    const [dcfChartData, setDCFChartData] = useState(null);
    const [selectedProjection, setSelectedProjection] = useState('all');

    useEffect(() => {
        const chartData = handleChartData(assumptionsSetup, incomeStatement.slice(0).reverse(), 
        cashflowStatement.slice(0).reverse());
        setDCFChartData(chartData);
    }, [assumptionsSetup, incomeStatement]);
 
    return (
        <>
        {/* <Divider sx={{marginTop:'10px', marginBottom:'30px'}} /> */}
        <Stack width={'100%'} mt={6} mb={4}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <BodyTextTitle variant='h3' wantedColor={Colors.primary} mb={2}>
                    { assumptionsSetup?.baseMetric === 'freeCashflow' ? 'Free Cashflow Projection' : 'Net Income Projection' }
                </BodyTextTitle>

                <DCFChartSelection selectedProjection={selectedProjection} setSelectedProjection={setSelectedProjection} />
            </Stack>
            <DCFChart dcfChartData={dcfChartData} selectedProjection={selectedProjection} />
        </Stack>
        </>
    )
}

export default DCFChartSection;

const handleChartData = (assumptionsSetup, incomeStatement, cashflowStatement) => {

    const { baseMetric, baseValue, fcfGrowthLow, fcfGrowthMid, fcfGrowthHigh, netIncomeGrowthLow, netIncomeGrowthMid, netIncomeGrowthHigh } = assumptionsSetup;

    let metricProjectionLow = [Number.NaN, Number.NaN, Number.NaN, Number.NaN];
    let metricProjectionMid = [Number.NaN, Number.NaN, Number.NaN, Number.NaN];
    let metricProjectionHigh = [Number.NaN, Number.NaN, Number.NaN, Number.NaN];
    let metricHistoric = [];

    if (baseMetric === 'freeCashflow') {
        metricProjectionLow.push(cashflowStatement[4]?.freeCashFlow);
        metricProjectionMid.push(cashflowStatement[4]?.freeCashFlow);
        metricProjectionHigh.push(cashflowStatement[4]?.freeCashFlow);
        for (let i = 1; i <= 5; i++) { 
            metricProjectionLow.push(baseValue * Math.pow(1+(fcfGrowthLow/100), i))
            metricProjectionMid.push(baseValue * Math.pow(1+(fcfGrowthMid/100), i))
            metricProjectionHigh.push(baseValue * Math.pow(1+(fcfGrowthHigh/100), i))
        }
        metricHistoric = cashflowStatement?.map(element => element.freeCashFlow);
    }
    else {
        metricProjectionLow.push(incomeStatement[4]?.netIncome);
        metricProjectionMid.push(incomeStatement[4]?.netIncome);
        metricProjectionHigh.push(incomeStatement[4]?.netIncome);
        for (let i = 1; i <= 5; i++) { 
            metricProjectionLow.push(baseValue * Math.pow(1+(netIncomeGrowthLow/100), i))
            metricProjectionMid.push(baseValue * Math.pow(1+(netIncomeGrowthMid/100), i))
            metricProjectionHigh.push(baseValue * Math.pow(1+(netIncomeGrowthHigh/100), i))
            metricHistoric = cashflowStatement?.map(element => element.freeCashFlow);
        }
        metricHistoric = incomeStatement?.map(element => element.netIncome);
    }

    const dcfChartDates = handleChartDates(incomeStatement)
    
    const chartData = {
        dates: dcfChartDates,
        metricHistoric: metricHistoric,
        metricLow: metricProjectionLow,
        metricMid: metricProjectionMid,
        metricHigh: metricProjectionHigh
    }
    return chartData;
}

const handleChartDates = (array) => {
    let dcfChartDates = array.map(element => element.date);
    const newDate = new Date(dcfChartDates[4])
    for (let i = 1; i <= 5; i++) {
        newDate.setFullYear(newDate.getFullYear() + 1)
        const month = newDate.getMonth()+1;
        const year = newDate.getFullYear();
        const day = newDate. getDate();
        const currentDate = year + "-" + month + "-" + day;
        dcfChartDates.push(currentDate)
    }
    return dcfChartDates;
}
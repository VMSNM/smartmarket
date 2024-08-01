import { Paper, Table, TableBody, TableContainer, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { CustomTableHead } from '../../../../../styles/main';
import { Colors } from '../../../../../styles/theme';
import { useStockDetailsContext } from '../../../../../context/StockDetailsContext';
import AssumptionsTableDataHeader from './AssumptionsTableDataHeader';
import AssumptionsTableDataRow from './table-row-model/AssumptionsTableDataRow';
import { useDCFContext } from '../../../../../context/DCFContext';

const AssumptionsTableData = () => {

    const { value: {stockDetails: { balanceSheet }, keyMetrics: { netIncome, sharesOut, fcf, pfcfRatio, peRatio }}} = useStockDetailsContext();
    const { netIncomeGrowth } = netIncome;
    const { sharesOutGrowth } = sharesOut;
    const { fcfGrowth } = fcf;

    const { value: { assumptionsSetup }} = useDCFContext();

    useEffect(() => {
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 800, border:`1px solid ${Colors.border}` }} aria-label="customized table">
                <CustomTableHead variant={'head'}>
                    <AssumptionsTableDataHeader />
                </CustomTableHead>

                <TableBody>
                    {assumptionsSetup?.baseMetric === 'freeCashflow' 
                        ? 
                        <AssumptionsTableDataRow 
                            metricTitle={'FCF Growth'}
                            metricDataLastYear={fcfGrowth?.growth?.slice(0).reverse()[0] * 100}
                            metricDataAvg2YRS={fcfGrowth?.avg2YRS * 100}
                            metricDataAvg5YRS={fcfGrowth?.avg5YRS * 100}
                            metricDataCAGR={fcfGrowth?.cagr * 100}
                            coloredData='positive'
                            rateValueAboveBellow={0}
                            dataFormat='percent'
                            inputsNames={{low: 'fcfGrowthLow', mid: 'fcfGrowthMid', high: 'fcfGrowthHigh'}}
                            inputsData={{low: assumptionsSetup?.fcfGrowthLow, mid: assumptionsSetup?.fcfGrowthMid, high: assumptionsSetup?.fcfGrowthHigh}}
                        />
                        : 
                        <AssumptionsTableDataRow 
                            metricTitle={'Net Income Growth'}
                            metricDataLastYear={netIncomeGrowth?.growth?.slice(0).reverse()[0] * 100}
                            metricDataAvg2YRS={netIncomeGrowth?.avg2YRS * 100}
                            metricDataAvg5YRS={netIncomeGrowth?.avg5YRS * 100}
                            metricDataCAGR={netIncomeGrowth?.cagr * 100}
                            coloredData='positive'
                            rateValueAboveBellow={0}
                            dataFormat='percent'
                            inputsNames={{low: 'netIncomeGrowthLow', mid: 'netIncomeGrowthMid', high: 'netIncomeGrowthHigh'}}
                            inputsData={{low: assumptionsSetup?.netIncomeGrowthLow, mid: assumptionsSetup?.netIncomeGrowthMid, high: assumptionsSetup?.netIncomeGrowthHigh}}
                        />
                    }
                    <AssumptionsTableDataRow 
                        metricTitle={'Shares Growth'}
                        metricDataLastYear={sharesOutGrowth?.growth?.slice(0).reverse()[0] * 100}
                        metricDataAvg2YRS={sharesOutGrowth?.avg2YRS * 100}
                        metricDataAvg5YRS={sharesOutGrowth?.avg5YRS * 100}
                        metricDataCAGR={sharesOutGrowth?.cagr * 100}
                        coloredData='negative'
                        rateValueAboveBellow={0}
                        dataFormat='percent'
                        inputsNames={{low: 'sharesOutGrowthLow', mid: 'sharesOutGrowthMid', high: 'sharesOutGrowthHigh'}}
                        inputsData={{low: assumptionsSetup?.sharesOutGrowthLow, mid: assumptionsSetup?.sharesOutGrowthMid, high: assumptionsSetup?.sharesOutGrowthHigh}}
                        
                    />

                    { assumptionsSetup?.baseMetric === 'freeCashflow' 
                    ? 
                    <>
                        <AssumptionsTableDataRow 
                            metricTitle={'PFCF Ratio'}
                            metricDataLastYear={pfcfRatio?.pfcfRatioLastYR}
                            metricDataAvg2YRS={pfcfRatio?.pfcfRatioAvg2YRS}
                            metricDataAvg5YRS={pfcfRatio?.pfcfRatioAvg5YRS}
                            coloredData={'negative'} rateValuesMinAvgMax={{min:20, avg: 25}} 
                            dataFormat='float-number'
                            inputsNames={{low: 'pfcfRatioLow', mid: 'pfcfRatioMid', high: 'pfcfRatioHigh'}}
                            inputsData={{low: assumptionsSetup?.pfcfRatioLow, mid: assumptionsSetup?.pfcfRatioMid, high: assumptionsSetup?.pfcfRatioHigh}}
                            
                        />
                    </>
                    :
                    <>
                        <AssumptionsTableDataRow 
                            metricTitle={'PE Ratio'}
                            metricDataLastYear={peRatio?.peRatioLastYR}
                            metricDataAvg2YRS={peRatio?.peRatioAvg2YRS}
                            metricDataAvg5YRS={peRatio?.peRatioAvg5YRS}
                            coloredData={'negative'} rateValuesMinAvgMax={{min:20, avg: 25}} 
                            dataFormat='float-number'
                            inputsNames={{low: 'peRatioLow', mid: 'peRatioMid', high: 'peRatioHigh'}}
                            inputsData={{low: assumptionsSetup?.peRatioLow, mid: assumptionsSetup?.peRatioMid, high: assumptionsSetup?.peRatioHigh}}
                            
                        />
                    </>
                    }

                    <AssumptionsTableDataRow 
                        metricTitle={'Net Cash Position'}
                        metricDataLastYear={balanceSheet[0]?.cashAndShortTermInvestments - balanceSheet[0]?.totalDebt}
                        coloredData='positive'
                        rateValueAboveBellow={0}
                        dataFormat={'dollar-compact'}
                        noInputs={true}
                    />

                    <AssumptionsTableDataRow 
                        metricTitle={'Discount Rate'} 
                        inputsNames={{low: 'discountRateLow', mid: 'discountRateMid', high: 'discountRateHigh'}}
                        inputsData={{low: assumptionsSetup?.discountRateLow, mid: assumptionsSetup?.discountRateMid, high: assumptionsSetup?.discountRateHigh}}
                        
                    />

                    <AssumptionsTableDataRow 
                        metricTitle={'Perpetual Growth Rate'} 
                        inputsNames={{low: 'perpetualGRLow', mid: 'perpetualGRMid', high: 'perpetualGRHigh'}}
                        inputsData={{low: assumptionsSetup?.perpetualGRLow, mid: assumptionsSetup?.perpetualGRMid, high: assumptionsSetup?.perpetualGRHigh}}
                        
                    />
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AssumptionsTableData;
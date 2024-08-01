import * as React from 'react';
import { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { Colors } from '../../../styles/theme';
import { useStockDetailsContext } from '../../../context/StockDetailsContext';
import { CustomTableHead, CustomTableRow, CustomTableCell } from '../../../styles/main';
import { convertToNumberAndRound } from '../../../utils/useful';
import Table10PillarsDataReverseBtn from './Table10PillarsDataReverseBtn';
import { Stack } from '@mui/material';
import TableRowModel from '../../stockdetails-layout/table-models/TableRowModel';
import { useTablesActionBtnsContext } from '../../../context/TablesActionBtnsContext';
import ShowMargins from '../../stockdetails-layout/table-action-btns/ShowMargins';
import ShowGrowth from '../../stockdetails-layout/table-action-btns/ShowGrowth';
import ShowTableToggle from '../../stockdetails-layout/show-table-toggle/ShowTableToggle';

export default function Table10PillarsData() {
    const { value: { stockDetails, keyMetrics }} = useStockDetailsContext();
    const { reversed, setReversed, showGrowth, showMargins } = useTablesActionBtnsContext();
    const { incomeStatement, balanceSheet, cashflowStatement, keyMetricsFMP } = stockDetails;
    const { revenue, netIncome, sharesOut, fcf, totalLiabilities, debtToEquity, roic, roa, peRatio, pfcfRatio } = keyMetrics;

    const [incomeStatementUI, setIncomeStatementUI] = useState(incomeStatement.slice(0).reverse());
    const [balanceSheetUI, setBalanceSheetUI] = useState(balanceSheet.slice(0).reverse());
    const [cashflowStatementUI, setCashflowStatementUI] = useState(cashflowStatement.slice(0).reverse());
    const [keyMetricsFMPUI, setKeyMetricsFMPUI] = useState(keyMetricsFMP.slice(0).reverse());

    const [showTable, setShowTable] = useState(false);

    return (
    <>
        <ShowTableToggle tableTitle="10 Pillars Data" showTable={showTable} setShowTable={setShowTable} />
        { showTable && (
            <Stack>
                <Stack direction={'row'} justifyContent={'flex-end'} alignItems={'center'} gap={1} mb={1}>
                    <ShowMargins reversed={reversed} setReversed={setReversed} />
                    <ShowGrowth reversed={reversed} setReversed={setReversed} />
                    <Table10PillarsDataReverseBtn 
                        setIncomeStatementUI={setIncomeStatementUI} 
                        setBalanceSheetUI={setBalanceSheetUI} 
                        setCashflowStatementUI={setCashflowStatementUI} 
                        setKeyMetricsFMPUI={setKeyMetricsFMPUI} 
                        reversed={reversed} 
                        setReversed={setReversed} 
                    />
                </Stack>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 900, border:`1px solid ${Colors.border}` }} aria-label="customized table">
                        <CustomTableHead variant={'head'}>
                            <CustomTableRow>
                                <CustomTableCell sx={{textAlign:'left'}}>Metric</CustomTableCell>

                                <CustomTableCell>Last 5Yrs</CustomTableCell>

                                { incomeStatementUI && incomeStatementUI.map((element, idx) => (
                                    <CustomTableCell key={idx}>
                                        {element?.date}
                                    </CustomTableCell>
                                ))}
                                
                                <CustomTableCell 
                                    bgColor={Colors.secondary} 
                                    txtColor={Colors.secondaryBG}
                                >
                                        2Yrs Avg
                                </CustomTableCell>

                                <CustomTableCell 
                                    bgColor={Colors.secondary} 
                                    txtColor={Colors.secondaryBG}
                                >
                                        5Yrs Avg
                                </CustomTableCell>
                            </CustomTableRow>
                        </CustomTableHead>

                        <TableBody>
                            <TableRowModel title={'Revenue'} 
                                titleBold={true} 
                                originalArray={incomeStatement} 
                                originalArrayMetric={incomeStatement?.map(record => record.revenue)} 
                                dataArray={incomeStatementUI} 
                                dataMetric={incomeStatementUI?.map(record => record.revenue)} 
                                reversed={reversed} 
                                dataFormat={'dollar-compact'} 
                                avg2YrsElement={revenue?.revenueAvg2YRS} 
                                avg5YrsElement={revenue?.revenueAvg5YRS} 
                            />

                            {showGrowth && 
                                <TableRowModel 
                                    title={'Revenue Growth'} 
                                    txtStyle={'italic'} 
                                    originalArray={incomeStatement} 
                                    originalArrayMetric={revenue?.revenueGrowth?.growth?.slice(0).reverse().map(record => record)} 
                                    dataArray={incomeStatement?.slice(0).reverse()} 
                                    dataMetric={revenue?.revenueGrowth?.growth?.map(record => record * 100)} 
                                    reversed={reversed} 
                                    dataFormat={'percent'} 
                                    avg2YrsElement={revenue?.revenueGrowth?.avg2YRS * 100} 
                                    avg5YrsElement={revenue?.revenueGrowth?.avg5YRS * 100} 
                                    coloredData={'positive'} rateValueAboveBellow={0} 
                                    identLevel={1} 
                                /> 
                            }

                            <TableRowModel 
                                title={'Net Income'} 
                                titleBold={true} 
                                originalArray={incomeStatement} 
                                dataArray={incomeStatementUI} 
                                originalArrayMetric={incomeStatement?.map(record => record.netIncome)} 
                                dataMetric={incomeStatementUI?.map(record => record.netIncome)} 
                                reversed={reversed} 
                                dataFormat={'dollar-compact'} 
                                avg2YrsElement={netIncome?.netIncomeAvg2YRS} 
                                avg5YrsElement={netIncome?.netIncomeAvg5YRS} 
                            />

                            {showGrowth && 
                                <TableRowModel 
                                    title={'NI Growth'} 
                                    txtStyle={'italic'} 
                                    originalArray={incomeStatement} 
                                    originalArrayMetric={netIncome?.netIncomeGrowth?.growth?.slice(0).reverse().map(record => record)} 
                                    dataArray={incomeStatement?.slice(0).reverse()} 
                                    dataMetric={netIncome?.netIncomeGrowth?.growth?.map(record => record * 100)} 
                                    reversed={reversed} 
                                    dataFormat={'percent'} 
                                    avg2YrsElement={netIncome?.netIncomeGrowth?.avg2YRS * 100} 
                                    avg5YrsElement={netIncome?.netIncomeGrowth?.avg5YRS * 100} 
                                    coloredData={'positive'} rateValueAboveBellow={0} 
                                    positiveDataInverse={false} 
                                    identLevel={1} 
                                /> 
                            }

                            {showMargins && 
                                <TableRowModel 
                                    title={'NI Margin'} 
                                    txtStyle={'italic'} 
                                    originalArray={incomeStatement} 
                                    originalArrayMetric={netIncome?.netIncomeMargins?.margins?.slice(0).reverse().map(record => record)} 
                                    dataArray={incomeStatement?.slice(0).reverse()} 
                                    dataMetric={netIncome?.netIncomeMargins?.margins?.map(record => record * 100)} 
                                    reversed={reversed} 
                                    dataFormat={'percent'} 
                                    avg2YrsElement={netIncome?.netIncomeMargins?.avg2YRS * 100} 
                                    avg5YrsElement={netIncome?.netIncomeMargins?.avg5YRS * 100} 
                                    coloredData={'positive'} rateValuesMinAvgMax={{max: 20, avg: 10}} 
                                    identLevel={1} 
                                /> 
                            }

                            <TableRowModel 
                                title={'Shares Outstanding'} 
                                titleBold={true} 
                                originalArray={incomeStatement} 
                                dataArray={incomeStatementUI} 
                                originalArrayMetric={incomeStatement?.map(record => record.weightedAverageShsOutDil)}
                                dataMetric={incomeStatementUI?.map(record => record.weightedAverageShsOutDil / 1000)}
                                reversed={reversed} 
                                dataFormat={''} 
                                avg2YrsElement={sharesOut?.sharesOutAvg2YRS / 1000} 
                                avg5YrsElement={sharesOut?.sharesOutAvg5YRS / 1000} 
                                positiveDataInverse={true} 
                            />

                            {showGrowth && 
                                <TableRowModel 
                                    title={'Shares Out Growth'} 
                                    txtStyle={'italic'} 
                                    originalArray={incomeStatement} 
                                    originalArrayMetric={sharesOut?.sharesOutGrowth?.growth?.slice(0).reverse().map(record => record)} 
                                    dataArray={incomeStatement?.slice(0).reverse()} 
                                    dataMetric={sharesOut?.sharesOutGrowth?.growth?.map(record => record * 100)} 
                                    reversed={reversed} dataFormat={'percent'} 
                                    avg2YrsElement={sharesOut?.sharesOutGrowth?.avg2YRS * 100} 
                                    avg5YrsElement={sharesOut?.sharesOutGrowth?.avg5YRS * 100} 
                                    coloredData={'negative'} rateValueAboveBellow={0} 
                                    positiveDataInverse={true} 
                                    identLevel={1} 
                                /> 
                            }

                            <TableRowModel 
                                title={'Free Cash Flow'} 
                                titleBold={true} 
                                originalArray={cashflowStatement} 
                                dataArray={cashflowStatementUI} 
                                originalArrayMetric={cashflowStatement?.map(record => record.freeCashFlow)}
                                dataMetric={cashflowStatementUI?.map(record => record.freeCashFlow)} 
                                reversed={reversed} 
                                dataFormat={'dollar-compact'} 
                                avg2YrsElement={fcf?.fcfAvg2YRS} 
                                avg5YrsElement={fcf?.fcfAvg5YRS} 
                            />

                            {showGrowth && 
                                <TableRowModel 
                                    title={'FCF Growth'} 
                                    txtStyle={'italic'} 
                                    originalArray={cashflowStatement} 
                                    originalArrayMetric={fcf?.fcfGrowth?.growth?.slice(0).reverse().map(record => record)} 
                                    dataArray={cashflowStatement?.slice(0).reverse()}  
                                    dataMetric={fcf?.fcfGrowth?.growth?.map(record => record * 100)} 
                                    reversed={reversed} dataFormat={'percent'} 
                                    avg2YrsElement={fcf?.fcfGrowth?.avg2YRS * 100} 
                                    avg5YrsElement={fcf?.fcfGrowth?.avg5YRS * 100} 
                                    coloredData={'positive'} rateValueAboveBellow={0} 
                                    positiveDataInverse={false} 
                                    identLevel={1} 
                                /> 
                            }

                            {showMargins && 
                                <TableRowModel 
                                    title={'FCF Margin'} 
                                    txtStyle={'italic'} 
                                    originalArray={cashflowStatement} 
                                    originalArrayMetric={fcf?.fcfMargins?.margins?.slice(0).reverse().map(record => record)} 
                                    dataArray={cashflowStatement?.slice(0).reverse()}  
                                    dataMetric={fcf?.fcfMargins?.margins?.map(record => record * 100)} 
                                    reversed={reversed} 
                                    dataFormat={'percent'} 
                                    avg2YrsElement={fcf?.fcfMargins?.avg2YRS * 100} 
                                    avg5YrsElement={fcf?.fcfMargins?.avg5YRS * 100} 
                                    coloredData={'positive'} rateValuesMinAvgMax={{max: 20, avg: 10}} 
                                    identLevel={1} 
                                /> 
                            }

                            <TableRowModel 
                                title={'Total Liabilities'} 
                                titleBold={true} 
                                originalArray={balanceSheet} 
                                dataArray={balanceSheetUI} 
                                originalArrayMetric={balanceSheet?.map(record => record.totalLiabilities)}
                                dataMetric={balanceSheetUI?.map(record => record.totalLiabilities)} 
                                reversed={reversed} 
                                dataFormat={'dollar-compact'} 
                                avg2YrsElement={totalLiabilities?.totalLiabilitiesAvg2YRS} 
                                avg5YrsElement={totalLiabilities?.totalLiabilitiesAvg5YRS} 
                                positiveDataInverse={true}
                            />

                            {showGrowth && 
                                <TableRowModel 
                                    title={'TL Growth'} 
                                    txtStyle={'italic'} 
                                    originalArray={balanceSheet} 
                                    originalArrayMetric={totalLiabilities?.totalLiabilitiesGrowth?.growth?.map(record => record)} 
                                    dataArray={incomeStatement?.slice(0).reverse()} 
                                    dataMetric={totalLiabilities?.totalLiabilitiesGrowth?.growth?.map(record => record * 100)} 
                                    reversed={reversed} dataFormat={'percent'} 
                                    avg2YrsElement={totalLiabilities?.totalLiabilitiesGrowth?.avg2YRS * 100} 
                                    avg5YrsElement={totalLiabilities?.totalLiabilitiesGrowth?.avg5YRS * 100} 
                                    coloredData={'negative'} rateValueAboveBellow={0} 
                                    positiveDataInverse={true} 
                                    identLevel={1} 
                                /> 
                            }

                            <TableRowModel 
                                title={'Debt To Equity'} 
                                titleBold={true} 
                                originalArray={keyMetricsFMP} 
                                originalArrayMetric={keyMetricsFMP?.map(record => record.debtToEquity)} 
                                dataArray={keyMetricsFMPUI} 
                                dataMetric={keyMetricsFMPUI?.map(record => record.debtToEquity * 100)}
                                reversed={reversed} 
                                dataFormat={'percent'} 
                                avg2YrsElement={debtToEquity?.debtToEquityAvg2YRS * 100} 
                                avg5YrsElement={debtToEquity?.debtToEquityAvg5YRS * 100} 
                                coloredData={'negative'} rateValuesMinAvgMax={{min: 50, avg: 100}} 
                            />

                            <TableRowModel 
                                title={'ROIC'} 
                                titleBold={true} 
                                originalArray={keyMetricsFMP} 
                                originalArrayMetric={keyMetricsFMP?.map(record => record.roic)} 
                                dataArray={keyMetricsFMPUI} 
                                dataMetric={keyMetricsFMPUI?.map(record => record.roic * 100)} 
                                reversed={reversed} 
                                dataFormat={'percent'} 
                                avg2YrsElement={roic?.roicAvg2YRS * 100} 
                                avg5YrsElement={roic?.roicAvg5YRS * 100} 
                                coloredData={'positive'} rateValuesMinAvgMax={{avg: 10, max:15}} 
                            />

                            <TableRowModel 
                                title={'ROtA'} 
                                titleBold={true} 
                                originalArray={keyMetricsFMP} 
                                originalArrayMetric={keyMetricsFMP?.map(record => record.returnOnTangibleAssets)} 
                                dataArray={keyMetricsFMPUI} 
                                dataMetric={keyMetricsFMPUI?.map(record => record.returnOnTangibleAssets * 100)} 
                                reversed={reversed} 
                                dataFormat={'percent'} 
                                avg2YrsElement={roa?.roaAvg2YRS * 100} 
                                avg5YrsElement={roa?.roaAvg5YRS * 100} 
                                coloredData={'positive'} rateValuesMinAvgMax={{avg: 12, max:20}} 
                            />
                            
                            <TableRowModel 
                                title={'PE Ratio'} 
                                titleBold={true} 
                                originalArray={keyMetricsFMP} 
                                originalArrayMetric={keyMetricsFMP?.map(record => record.peRatio)} 
                                dataArray={keyMetricsFMPUI} 
                                dataMetric={keyMetricsFMPUI?.map(record => convertToNumberAndRound(record.peRatio))}
                                reversed={reversed} 
                                dataFormat={''} 
                                avg2YrsElement={peRatio?.peRatioAvg2YRS} 
                                avg5YrsElement={peRatio?.peRatioAvg5YRS} 
                                coloredData={'negative'} rateValuesMinAvgMax={{min:20, avg: 25}} 
                                positiveDataInverse={true}
                            />

                            <TableRowModel 
                                title={'PFCF Ratio'} 
                                titleBold={true} 
                                originalArray={keyMetricsFMP} 
                                originalArrayMetric={keyMetricsFMP?.map(record => record.pfcfRatio)} 
                                dataArray={keyMetricsFMPUI} 
                                dataMetric={keyMetricsFMPUI?.map(record => convertToNumberAndRound(record.pfcfRatio))} 
                                reversed={reversed} 
                                dataFormat={''} 
                                avg2YrsElement={pfcfRatio?.pfcfRatioAvg2YRS} 
                                avg5YrsElement={pfcfRatio?.pfcfRatioAvg5YRS} 
                                coloredData={'negative'} rateValuesMinAvgMax={{min:20, avg: 25}} 
                                positiveDataInverse={true}
                            />
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        )}
    </>
  );
}
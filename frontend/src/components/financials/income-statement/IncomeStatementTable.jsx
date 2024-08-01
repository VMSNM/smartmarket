import React, { useState } from 'react'
import { useStockDetailsContext } from '../../../context/StockDetailsContext';
import { CircularProgress, Paper, Stack, Table, TableBody, TableContainer, Typography } from '@mui/material';
import FinancialTablesReverseBtn from '../FinancialTablesReverseBtn';
import { CustomTableCell, CustomTableHead, CustomTableRow, LoadingBox } from '../../../styles/main';
import { Colors } from '../../../styles/theme';
import TableRowModel from '../../stockdetails-layout/table-models/TableRowModel';
import { useTablesActionBtnsContext } from '../../../context/TablesActionBtnsContext';
import ShowMargins from '../../stockdetails-layout/table-action-btns/ShowMargins';
import ShowGrowth from '../../stockdetails-layout/table-action-btns/ShowGrowth';
import { TablesActionBtnsContainer } from '../../../styles/stockdetails-layout/tables';


const IncomeStatementTable = () => {
    const { value: { stockDetails: { incomeStatement }, keyMetrics}} = useStockDetailsContext();
    const [incomeStatementUI, setIncomeStatementUI] = useState(incomeStatement.slice(0).reverse() || null);

    const { revenue, netIncome, sharesOut } = keyMetrics;

    const { reversed, setReversed, showGrowth, showMargins } = useTablesActionBtnsContext();

    return (
        <>
            { !incomeStatementUI && (
                <LoadingBox>
                    <CircularProgress />
                </LoadingBox>
            )}
            { incomeStatementUI && (
                <>
                <TablesActionBtnsContainer>
                    <ShowMargins reversed={reversed} setReversed={setReversed} />
                    <ShowGrowth reversed={reversed} setReversed={setReversed} />
                    <FinancialTablesReverseBtn financialStatement={incomeStatement} setFinancialStatementUI={setIncomeStatementUI} reversed={reversed} setReversed={setReversed} />
                </TablesActionBtnsContainer>
                
                <TableContainer component={Paper} sx={{marginBottom:'40px'}}>
                    <Table sx={{ minWidth: 700, border:`1px solid ${Colors.border}` }} aria-label="customized table">
                        <CustomTableHead variant={'head'}>
                            <CustomTableRow>
                                <CustomTableCell sx={{textAlign:'left'}}>Metric</CustomTableCell>

                                <CustomTableCell>Last 5Yrs</CustomTableCell>

                                { incomeStatementUI && incomeStatementUI.map((element, idx) => (
                                    <CustomTableCell 
                                        key={idx}
                                        sx={{ backgroundColor: (!reversed && idx === incomeStatementUI.length -1) || (reversed && idx === 0) ? `${Colors.secondary} !important` : ''}}
                                    >
                                        {element?.date}
                                    </CustomTableCell>
                                ))}
                            </CustomTableRow>
                        </CustomTableHead>

                        <TableBody>
                            <TableRowModel 
                                title={'Revenue'} 
                                titleBold={true} 
                                originalArray={incomeStatement} 
                                originalArrayMetric={incomeStatement?.map(record => record.revenue)} 
                                dataArray={incomeStatementUI} 
                                dataMetric={incomeStatementUI?.map(record => record.revenue)} 
                                reversed={reversed} 
                                dataFormat={'dollar-compact'} 
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
                                    coloredData={'positive'} rateValueAboveBellow={0} 
                                    identLevel={1} 
                                /> 
                            }

                            <TableRowModel 
                                title={'Cost of Revenue'} 
                                titleBold={true} 
                                originalArray={incomeStatement}
                                originalArrayMetric={incomeStatement?.map(record => record.costOfRevenue)}
                                dataArray={incomeStatementUI} 
                                dataMetric={incomeStatementUI?.map(record => record.costOfRevenue)} 
                                reversed={reversed} 
                                dataFormat={'dollar-compact'} 
                                positiveDataInverse={true} 
                            />

                            <TableRowModel 
                                title={'Gross Profit'} 
                                titleBold={true} 
                                originalArray={incomeStatement} 
                                originalArrayMetric={incomeStatement?.map(record => record.grossProfit)} 
                                dataArray={incomeStatementUI} 
                                dataMetric={incomeStatementUI?.map(record => record.grossProfit)} 
                                reversed={reversed} 
                                dataFormat={'dollar-compact'} 
                                positiveDataInverse={false} 
                                coloredData={'positive'} rateValueAboveBellow={0} 
                            />

                            <TableRowModel 
                                title={'Operating Expenses'} 
                                titleBold={true}
                                originalArray={incomeStatement} 
                                originalArrayMetric={incomeStatement?.map(record => record.operatingExpenses)} 
                                dataArray={incomeStatementUI}
                                dataMetric={incomeStatementUI?.map(record => record.operatingExpenses)} 
                                reversed={reversed} 
                                dataFormat={'dollar-compact'} 
                                positiveDataInverse={true} 
                            />

                            <TableRowModel 
                                title={'Operating Income'} 
                                titleBold={true} 
                                originalArray={incomeStatement} 
                                originalArrayMetric={incomeStatement?.map(record => record.operatingIncome)} 
                                dataArray={incomeStatementUI} 
                                dataMetric={incomeStatementUI?.map(record => record.operatingIncome)} 
                                reversed={reversed} 
                                dataFormat={'dollar-compact'} 
                                positiveDataInverse={false} 
                                coloredData={'positive'} rateValueAboveBellow={0} 
                            />
                            
                            <TableRowModel 
                                title={'EBITDA'} 
                                titleBold={true} 
                                originalArray={incomeStatement} 
                                originalArrayMetric={incomeStatement?.map(record => record.ebitda)} 
                                dataArray={incomeStatementUI} 
                                dataMetric={incomeStatementUI?.map(record => record.ebitda)} 
                                reversed={reversed} 
                                dataFormat={'dollar-compact'} 
                                positiveDataInverse={false} 
                                coloredData={'positive'} rateValueAboveBellow={0} 
                            />

                            <TableRowModel 
                                title={'Net Income'} 
                                titleBold={true} 
                                originalArray={incomeStatement} 
                                originalArrayMetric={incomeStatement?.map(record => record.netIncome)}
                                dataArray={incomeStatementUI} 
                                dataMetric={incomeStatementUI?.map(record => record.netIncome)} 
                                reversed={reversed} 
                                dataFormat={'dollar-compact'} 
                                positiveDataInverse={false} 
                                coloredData={'positive'} rateValueAboveBellow={0} 
                            />

                            {showGrowth && 
                                <TableRowModel 
                                    title={'NI Growth'} 
                                    txtStyle={'italic'} 
                                    originalArray={incomeStatement} 
                                    originalArrayMetric={netIncome?.netIncomeGrowth?.growth?.slice(0).reverse().map(record => record)} 
                                    dataArray={incomeStatement.slice(0).reverse()} 
                                    dataMetric={netIncome?.netIncomeGrowth?.growth?.map(record => record * 100)} 
                                    reversed={reversed} 
                                    dataFormat={'percent'} 
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
                                    dataArray={incomeStatement.slice(0).reverse()} 
                                    dataMetric={netIncome?.netIncomeMargins?.margins?.map(record => record * 100)} 
                                    reversed={reversed} 
                                    dataFormat={'percent'} 
                                    coloredData={'positive'} rateValuesMinAvgMax={{max: 20, avg: 10}} identLevel={1} 
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
                                positiveDataInverse={true} 
                            />

                            {showGrowth && 
                                <TableRowModel 
                                    title={'Shares Out Growth'} 
                                    txtStyle={'italic'} 
                                    originalArray={incomeStatement} 
                                    originalArrayMetric={sharesOut?.sharesOutGrowth?.growth?.map(record => record)} 
                                    dataArray={sharesOut?.sharesOutGrowth?.growth?.reverse()} 
                                    dataMetric={sharesOut?.sharesOutGrowth?.growth?.map(record => record * 100)} 
                                    reversed={reversed} 
                                    dataFormat={'percent'} 
                                    coloredData={'negative'} rateValueAboveBellow={0} 
                                    positiveDataInverse={true} 
                                    identLevel={1} 
                                /> 
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                </>
            )}
        </>
    )
}

export default IncomeStatementTable
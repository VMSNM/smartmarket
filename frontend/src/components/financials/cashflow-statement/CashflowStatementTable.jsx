import React, { useState } from 'react'
import { useStockDetailsContext } from '../../../context/StockDetailsContext';
import { CircularProgress, Paper, Table, TableBody, TableContainer, Typography } from '@mui/material';
import FinancialTablesReverseBtn from '../FinancialTablesReverseBtn';
import { CustomTableCell, CustomTableHead, CustomTableRow, LoadingBox } from '../../../styles/main';
import { Colors } from '../../../styles/theme';
import TableRowModel from '../../stockdetails-layout/table-models/TableRowModel';
import { useTablesActionBtnsContext } from '../../../context/TablesActionBtnsContext';
import { TablesActionBtnsContainer } from '../../../styles/stockdetails-layout/tables';
import ShowMargins from '../../stockdetails-layout/table-action-btns/ShowMargins';
import ShowGrowth from '../../stockdetails-layout/table-action-btns/ShowGrowth';

const CashflowStatementTable = () => {
    const { value: { stockDetails: { cashflowStatement }, keyMetrics}} = useStockDetailsContext();
    const { fcf } = keyMetrics;

    const [cashflowStatementUI, setCashflowStatementUI] = useState(cashflowStatement.slice(0).reverse() || null);

    const { reversed, setReversed, showGrowth, showMargins } = useTablesActionBtnsContext();

    const [showOperatingActivities, setShowOperatingActivities] = useState(false);
    const [showInvestingActivities, setShowInvestingActivities] = useState(false);
    const [showFinancingActivities, setShowFinancingActivities] = useState(false);

    return (
        <>
            { !cashflowStatementUI && (
                <LoadingBox>
                    <CircularProgress />
                </LoadingBox>
            )}
            { cashflowStatementUI && (
                <>
                <TablesActionBtnsContainer>
                    <ShowMargins reversed={reversed} setReversed={setReversed} />
                    <ShowGrowth reversed={reversed} setReversed={setReversed} />
                    <FinancialTablesReverseBtn 
                        financialStatement={cashflowStatement} 
                        setFinancialStatementUI={setCashflowStatementUI} 
                        reversed={reversed} 
                        setReversed={setReversed} 
                    />
                </TablesActionBtnsContainer>
                
                <TableContainer component={Paper} sx={{marginBottom:'40px'}}>
                    <Table sx={{ minWidth: 700, border:`1px solid ${Colors.border}` }} aria-label="customized table">
                        <CustomTableHead variant={'head'}>
                            <CustomTableRow>
                                <CustomTableCell sx={{textAlign:'left'}}>Metric</CustomTableCell>

                                <CustomTableCell>Last 5Yrs</CustomTableCell>

                                { cashflowStatementUI && cashflowStatementUI.map((element, idx) => (
                                    <CustomTableCell 
                                        key={idx}
                                        sx={{ backgroundColor: (!reversed && idx === cashflowStatementUI.length -1) || (reversed && idx === 0) ? `${Colors.secondary} !important` : ''}}
                                    >
                                        {element?.date}
                                    </CustomTableCell>
                                ))}
                            </CustomTableRow>
                        </CustomTableHead>

                        <TableBody>
                            <TableRowModel title={'Cash From Operating Activities'} titleBold={true} originalArray={cashflowStatement} originalArrayMetric={cashflowStatement?.map(record => record.netCashProvidedByOperatingActivities)} dataArray={cashflowStatementUI} dataMetric={cashflowStatementUI?.map(record => record.netCashProvidedByOperatingActivities)} reversed={reversed} dataFormat={'dollar-compact'} positiveDataInverse={false} showExpandableMetric={showOperatingActivities} setExpandableMetric={setShowOperatingActivities} coloredData={'positive'} rateValueAboveBellow={0} />

                            { showOperatingActivities && (
                            <>
                                <TableRowModel title={'Stock Based Compensation'} originalArray={cashflowStatement} originalArrayMetric={cashflowStatement?.map(record => record.stockBasedCompensation)} dataArray={cashflowStatementUI} dataMetric={cashflowStatementUI?.map(record => record.stockBasedCompensation)} reversed={reversed} dataFormat={'dollar-compact'} positiveDataInverse={true} identLevel={1.5} />

                                <TableRowModel title={'Change in Working Capital'} originalArray={cashflowStatement} originalArrayMetric={cashflowStatement?.map(record => record.changeInWorkingCapital)} dataArray={cashflowStatementUI} dataMetric={cashflowStatementUI?.map(record => record.changeInWorkingCapital)} reversed={reversed} dataFormat={'dollar-compact'} positiveDataInverse={false} identLevel={1.5} />
                            </>
                            )}

                            <TableRowModel title={'Cash From Investing Activities'} titleBold={true} originalArray={cashflowStatement} originalArrayMetric={cashflowStatement?.map(record => record.netCashUsedForInvestingActivites)} dataArray={cashflowStatementUI} dataMetric={cashflowStatementUI?.map(record => record.netCashUsedForInvestingActivites)} reversed={reversed} dataFormat={'dollar-compact'} positiveDataInverse={false} showExpandableMetric={showInvestingActivities} setExpandableMetric={setShowInvestingActivities} coloredData={'positive'} rateValueAboveBellow={0} />

                            { showInvestingActivities && (
                                <TableRowModel title={'Capital Expenditures'} originalArray={cashflowStatement} originalArrayMetric={cashflowStatement?.map(record => record.capitalExpenditure)} dataArray={cashflowStatementUI} dataMetric={cashflowStatementUI?.map(record => record.capitalExpenditure)} reversed={reversed} dataFormat={'dollar-compact'} positiveDataInverse={false} identLevel={1.5} />
                            )}
                            
                            <TableRowModel title={'Cash From Financing Activities'} titleBold={true} originalArray={cashflowStatement} originalArrayMetric={cashflowStatement?.map(record => record.netCashUsedProvidedByFinancingActivities)} dataArray={cashflowStatementUI} dataMetric={cashflowStatementUI?.map(record => record.netCashUsedProvidedByFinancingActivities)} reversed={reversed} dataFormat={'dollar-compact'} positiveDataInverse={false} showExpandableMetric={showFinancingActivities} setExpandableMetric={setShowFinancingActivities} coloredData={'positive'} rateValueAboveBellow={0}/>

                            { showFinancingActivities && (
                            <>
                                <TableRowModel title={'Debt Repayment'} originalArray={cashflowStatement} originalArrayMetric={cashflowStatement?.map(record => record.debtRepayment)} dataArray={cashflowStatementUI} dataMetric={cashflowStatementUI?.map(record => record.debtRepayment)} reversed={reversed} dataFormat={'dollar-compact'} positiveDataInverse={false} identLevel={1.5} />

                                <TableRowModel title={'Stock Repurchased'} originalArray={cashflowStatement} originalArrayMetric={cashflowStatement?.map(record => record.commonStockRepurchased)} dataArray={cashflowStatementUI} dataMetric={cashflowStatementUI?.map(record => record.commonStockRepurchased)} reversed={reversed} dataFormat={'dollar-compact'} positiveDataInverse={true} identLevel={1.5} />

                                <TableRowModel title={'Stock Issued'} originalArray={cashflowStatement} originalArrayMetric={cashflowStatement?.map(record => record.commonStockIssued)} dataArray={cashflowStatementUI} dataMetric={cashflowStatementUI?.map(record => record.commonStockIssued)} reversed={reversed} dataFormat={'dollar-compact'} positiveDataInverse={false} identLevel={1.5} />

                                <TableRowModel title={'Dividends Paid'} originalArray={cashflowStatement} originalArrayMetric={cashflowStatement?.map(record => record.dividendsPaid)} dataArray={cashflowStatementUI} dataMetric={cashflowStatementUI?.map(record => record.dividendsPaid)} reversed={reversed} dataFormat={'dollar-compact'} positiveDataInverse={false} identLevel={1.5} />
                            </>
                            )}

                            

                            <TableRowModel title={'Free Cashflow'} titleBold={true} originalArray={cashflowStatement} originalArrayMetric={cashflowStatement?.map(record => record.freeCashFlow)} dataArray={cashflowStatementUI} dataMetric={cashflowStatementUI?.map(record => record.freeCashFlow)} reversed={reversed} dataFormat={'dollar-compact'} positiveDataInverse={false} coloredData={'positive'} rateValueAboveBellow={0}/>

                            {showGrowth && 
                                <TableRowModel 
                                    title={'FCF Growth'} 
                                    txtStyle={'italic'} 
                                    originalArray={cashflowStatement} 
                                    originalArrayMetric={fcf?.fcfGrowth?.growth?.slice(0).reverse().map(record => record)} 
                                    dataArray={cashflowStatement?.slice(0).reverse()}  
                                    dataMetric={fcf?.fcfGrowth?.growth?.map(record => record * 100)} 
                                    reversed={reversed} dataFormat={'percent'} 
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
                                    coloredData={'positive'} rateValuesMinAvgMax={{max: 20, avg: 10}} 
                                    positiveDataInverse={false}
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

export default CashflowStatementTable;
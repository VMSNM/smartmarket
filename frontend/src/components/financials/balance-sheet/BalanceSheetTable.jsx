import React, { useState } from 'react'
import { useStockDetailsContext } from '../../../context/StockDetailsContext';
import { CircularProgress, Paper, Table, TableBody, TableContainer, Typography } from '@mui/material';
import FinancialTablesReverseBtn from '../FinancialTablesReverseBtn';
import { CustomTableCell, CustomTableHead, CustomTableRow, LoadingBox } from '../../../styles/main';
import { Colors } from '../../../styles/theme';
import TableRowModel from '../../stockdetails-layout/table-models/TableRowModel';
import { useTablesActionBtnsContext } from '../../../context/TablesActionBtnsContext';
import { TablesActionBtnsContainer } from '../../../styles/stockdetails-layout/tables';

const BalanceSheetTable = () => {
    const { value: { stockDetails: { balanceSheet }}} = useStockDetailsContext();
    const [balanceSheetUI, setBalanceSheetUI] = useState(balanceSheet.slice(0).reverse() || null);

    const { reversed, setReversed } = useTablesActionBtnsContext();

    const [showTotalAssets, setShowTotalAssets] = useState(false);
    const [showCurrentAssets, setShowCurrentAssets] = useState(false);
    const [showNonCurrentAssets, setShowNonCurrentAssets] = useState(false);
    const [showTotalLiabilities, setShowTotalLiabilities] = useState(false);
    const [showCurrentLiabilities, setShowCurrentLiabilities] = useState(false);
    const [showNonCurrentLiabilities, setShowNonCurrentLiabilities] = useState(false);

    return (
        <>
            { !balanceSheetUI && (
                <LoadingBox>
                    <CircularProgress />
                </LoadingBox>
            )}
            { balanceSheetUI && (
                <>
                <TablesActionBtnsContainer>
                    <FinancialTablesReverseBtn financialStatement={balanceSheet} setFinancialStatementUI={setBalanceSheetUI} reversed={reversed} setReversed={setReversed} />
                </TablesActionBtnsContainer>
                
                <TableContainer component={Paper} sx={{marginBottom:'40px'}}>
                    <Table sx={{ minWidth: 700, border:`1px solid ${Colors.border}` }} aria-label="customized table">
                        <CustomTableHead variant={'head'}>
                            <CustomTableRow>
                                <CustomTableCell sx={{textAlign:'left'}}>Metric</CustomTableCell>

                                <CustomTableCell>Last 5Yrs</CustomTableCell>

                                { balanceSheetUI && balanceSheetUI.map((element, idx) => (
                                    <CustomTableCell 
                                        key={idx}
                                        sx={{ backgroundColor: (!reversed && idx === balanceSheetUI.length -1) || (reversed && idx === 0) ? `${Colors.secondary} !important` : ''}}
                                    >
                                        {element?.date}
                                    </CustomTableCell>
                                ))}
                            </CustomTableRow>
                        </CustomTableHead>

                        <TableBody>
                            <TableRowModel 
                                title={'Total Assets'} titleBold={true} originalArray={balanceSheet} originalArrayMetric={balanceSheet?.map(record => record.totalAssets)} dataArray={balanceSheetUI} dataMetric={balanceSheetUI?.map(record => record.totalAssets)} reversed={reversed} dataFormat={'dollar-compact'} positiveDataInverse={false} showExpandableMetric={showTotalAssets} setExpandableMetric={setShowTotalAssets} />
                            
                            { showTotalAssets && (
                                <>
                                <TableRowModel title={'Current Assets'} titleBold={true} originalArray={balanceSheet} originalArrayMetric={balanceSheet?.map(record => record.totalCurrentAssets)} dataArray={balanceSheetUI} dataMetric={balanceSheetUI?.map(record => record.totalCurrentAssets)} reversed={reversed} dataFormat={'dollar-compact'} positiveDataInverse={false} identLevel={1} showExpandableMetric={showCurrentAssets} setExpandableMetric={setShowCurrentAssets}/>

                                { showCurrentAssets && (
                                <>
                                    <TableRowModel title={'Cash & Equivalents'} originalArray={balanceSheet} originalArrayMetric={balanceSheet?.map(record => record.cashAndCashEquivalents)} dataArray={balanceSheetUI} dataMetric={balanceSheetUI?.map(record => record.cashAndCashEquivalents)} reversed={reversed} dataFormat={'dollar-compact'} positiveDataInverse={false} identLevel={2}/>

                                    <TableRowModel title={'Short Term Investments'} originalArray={balanceSheet} originalArrayMetric={balanceSheet?.map(record => record.shortTermInvestments)} dataArray={balanceSheetUI} dataMetric={balanceSheetUI?.map(record => record.shortTermInvestments)} reversed={reversed} dataFormat={'dollar-compact'} positiveDataInverse={false} identLevel={2}/>

                                    <TableRowModel title={'Total Cash'} titleBold={true} originalArray={balanceSheet} originalArrayMetric={balanceSheet?.map(record => record.cashAndShortTermInvestments)} dataArray={balanceSheetUI} dataMetric={balanceSheetUI?.map(record => record.cashAndShortTermInvestments)} reversed={reversed} dataFormat={'dollar-compact'} positiveDataInverse={false} identLevel={2}/>
                                </>
                                )}

                                <TableRowModel title={'Non Current Assets'} titleBold={true} originalArray={balanceSheet} originalArrayMetric={balanceSheet?.map(record => record.totalNonCurrentAssets)} dataArray={balanceSheetUI} dataMetric={balanceSheetUI?.map(record => record.totalNonCurrentAssets)} reversed={reversed} dataFormat={'dollar-compact'} positiveDataInverse={false} identLevel={1} showExpandableMetric={showNonCurrentAssets} setExpandableMetric={setShowNonCurrentAssets}/>

                                { showNonCurrentAssets && (
                                <>
                                    <TableRowModel title={'Property Plant & Equipment'} originalArray={balanceSheet} originalArrayMetric={balanceSheet?.map(record => record.propertyPlantEquipmentNet)} dataArray={balanceSheetUI} dataMetric={balanceSheetUI?.map(record => record.propertyPlantEquipmentNet)} reversed={reversed} dataFormat={'dollar-compact'} positiveDataInverse={false} identLevel={2}/>

                                    <TableRowModel title={'Long Term Investments'} originalArray={balanceSheet} originalArrayMetric={balanceSheet?.map(record => record.longTermInvestments)} dataArray={balanceSheetUI} dataMetric={balanceSheetUI?.map(record => record.longTermInvestments)} reversed={reversed} dataFormat={'dollar-compact'} positiveDataInverse={false} identLevel={2}/>
                                    
                                    <TableRowModel title={'Goodwill & Intangibles'} originalArray={balanceSheet} originalArrayMetric={balanceSheet?.map(record => record.goodwillAndIntangibleAssets)} dataArray={balanceSheetUI} dataMetric={balanceSheetUI?.map(record => record.goodwillAndIntangibleAssets)} reversed={reversed} dataFormat={'dollar-compact'} positiveDataInverse={false} identLevel={2}/>
                                </>
                                )}

                                </>
                            )}
                            
                            <TableRowModel title={'Total Liabilities'} titleBold={true} originalArray={balanceSheet} originalArrayMetric={balanceSheet?.map(record => record.totalLiabilities)} dataArray={balanceSheetUI} dataMetric={balanceSheetUI?.map(record => record.totalLiabilities)} reversed={reversed} dataFormat={'dollar-compact'} positiveDataInverse={true} showExpandableMetric={showTotalLiabilities} setExpandableMetric={setShowTotalLiabilities}/>

                            { showTotalLiabilities && (
                            <>
                                <TableRowModel title={'Current Liabilities'} titleBold={true} originalArray={balanceSheet} originalArrayMetric={balanceSheet?.map(record => record.totalCurrentLiabilities)} dataArray={balanceSheetUI} dataMetric={balanceSheetUI?.map(record => record.totalCurrentLiabilities)} reversed={reversed} dataFormat={'dollar-compact'} positiveDataInverse={true} identLevel={1} showExpandableMetric={showCurrentLiabilities} setExpandableMetric={setShowCurrentLiabilities}/>

                                { showCurrentLiabilities && (
                                    <TableRowModel title={'Short Term Debt'} originalArray={balanceSheet} originalArrayMetric={balanceSheet?.map(record => record.shortTermDebt)} dataArray={balanceSheetUI} dataMetric={balanceSheetUI?.map(record => record.shortTermDebt)} reversed={reversed} dataFormat={'dollar-compact'} positiveDataInverse={true} identLevel={2}/>
                                )}
                                
                                <TableRowModel title={'Non Current Liabilities'} titleBold={true} originalArray={balanceSheet} originalArrayMetric={balanceSheet?.map(record => record.totalNonCurrentLiabilities)} dataArray={balanceSheetUI} dataMetric={balanceSheetUI?.map(record => record.totalNonCurrentLiabilities)} reversed={reversed} dataFormat={'dollar-compact'} positiveDataInverse={true} identLevel={1} showExpandableMetric={showNonCurrentLiabilities} setExpandableMetric={setShowNonCurrentLiabilities}/>

                                { showNonCurrentLiabilities && (
                                    <TableRowModel title={'Long Term Debt'} originalArray={balanceSheet} originalArrayMetric={balanceSheet?.map(record => record.longTermDebt)} dataArray={balanceSheetUI} dataMetric={balanceSheetUI?.map(record => record.longTermDebt)} reversed={reversed} dataFormat={'dollar-compact'} positiveDataInverse={true} identLevel={2}/>
                                )}
                            </>
                            )}
                            
                            <TableRowModel title={'Shareholders Equity'} titleBold={true} originalArray={balanceSheet} originalArrayMetric={balanceSheet?.map(record => record.totalStockholdersEquity)} dataArray={balanceSheetUI} dataMetric={balanceSheetUI?.map(record => record.totalStockholdersEquity)} reversed={reversed} dataFormat={'dollar-compact'} positiveDataInverse={false} coloredData={'positive'} rateValueAboveBellow={0}/>
                            
                        </TableBody>
                    </Table>
                </TableContainer>
                </>
            )}
        </>
    )
}

export default BalanceSheetTable
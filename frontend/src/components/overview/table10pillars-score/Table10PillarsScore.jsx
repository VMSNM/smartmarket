import * as React from 'react';
import { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { Colors } from '../../../styles/theme';
import { useStockDetailsContext } from '../../../context/StockDetailsContext';
import { CustomTableHead, CustomTableRow, CustomTableCell, BodyTextTitle, LoadingBox, RateBox } from '../../../styles/main';
import { convertToNumberAndRound } from '../../../utils/useful';
import { Box, CircularProgress, IconButton, Stack, styled } from '@mui/material';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import Table10PillarsScoreRow from './Table10PillarsScoreRow';
import Table10PillarsScoreRowHeader from './Table10PillarsScoreRowHeader';
import Table10PillarsScoreRowTotals from './Table10PillarsScoreRowTotals';
import ShowTableToggle from '../../stockdetails-layout/show-table-toggle/ShowTableToggle';

export default function Table10PillarsScore() {
    const { value: { pillars10Metrics }} = useStockDetailsContext();
    const { revenueGrowth, netIncomeGrowth, sharesOutGrowth, fcfGrowth, roicAvg5YRS, roaAvg5YRS, ltlFCFRatio, debtToEquity, peRatio, pfcfRatio, totals } = pillars10Metrics;

    const [showTable, setShowTable] = useState(true);

    return (
    <>
        <ShowTableToggle tableTitle="10 Pillars Score" showTable={showTable} setShowTable={setShowTable} />
        { !pillars10Metrics?.revenueGrowth && <LoadingBox> <CircularProgress /> </LoadingBox> }
        { pillars10Metrics?.revenueGrowth && showTable && (
            <Stack mb={4}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700, border:`1px solid ${Colors.border}` }} aria-label="customized table">
                        <CustomTableHead variant={'head'}>
                            <CustomTableRow>
                                <CustomTableCell bgColor={Colors.secondary} sx={{textAlign:'left'}}>Growth</CustomTableCell>

                                <CustomTableCell>Value</CustomTableCell>

                                <CustomTableCell>Check</CustomTableCell>

                                <CustomTableCell txtColor={Colors.secondaryBG}>Score</CustomTableCell>

                                <CustomTableCell>Rate</CustomTableCell>
                            </CustomTableRow>
                        </CustomTableHead>

                        <TableBody>
                            <Table10PillarsScoreRow metricTitle={'Revenue Growth'} metricValue={revenueGrowth?.revenueValue} metricCheck={revenueGrowth?.revenueCheck} metricScore={revenueGrowth?.revenueScore} metricRate={revenueGrowth?.revenueRate} dataFormat={'percentage'} />

                            <Table10PillarsScoreRow metricTitle={'Net Income Growth'} metricValue={netIncomeGrowth?.netIncomeValue} metricCheck={netIncomeGrowth?.netIncomeCheck} metricScore={netIncomeGrowth?.netIncomeScore} metricRate={netIncomeGrowth?.netIncomeRate} dataFormat={'percentage'} />

                            <Table10PillarsScoreRow metricTitle={'Shares Out Growth'} metricValue={sharesOutGrowth?.sharesOutValue} metricCheck={sharesOutGrowth?.sharesOutCheck} metricScore={sharesOutGrowth?.sharesOutScore} metricRate={sharesOutGrowth?.sharesOutRate} dataFormat={'percentage'} />

                            <Table10PillarsScoreRow metricTitle={'FCF Growth'} metricValue={fcfGrowth?.freeCashFlowValue} metricCheck={fcfGrowth?.freeCashFlowCheck} metricScore={fcfGrowth?.freeCashFlowScore} metricRate={fcfGrowth?.freeCashFlowRate} 
                            dataFormat={'percentage'} />

                            <Table10PillarsScoreRowHeader metricTitle={'Returns'} />

                            <Table10PillarsScoreRow metricTitle={'ROIC 5Yrs Avg'} metricValue={roicAvg5YRS?.roicValue * 100} metricCheck={roicAvg5YRS?.roicCheck} metricScore={roicAvg5YRS?.roicScore} metricRate={roicAvg5YRS?.roicRate} dataFormat={'percentage'} />

                            <Table10PillarsScoreRow metricTitle={'ROtA 5Yrs Avg'} metricValue={roaAvg5YRS?.roaValue * 100} metricCheck={roaAvg5YRS?.roaCheck} metricScore={roaAvg5YRS?.roaScore} metricRate={roaAvg5YRS?.roaRate} dataFormat={'percentage'} />

                            <Table10PillarsScoreRowHeader metricTitle={'Debt'} />

                            <Table10PillarsScoreRow metricTitle={'LTL / FCF Avg5Yrs'} metricValue={convertToNumberAndRound(ltlFCFRatio?.ltlFCFValue)} metricCheck={ltlFCFRatio?.ltlFCFCheck} metricScore={ltlFCFRatio?.ltlFCFScore} metricRate={ltlFCFRatio?.ltlFCFRate} dataFormat={''} />

                            <Table10PillarsScoreRow metricTitle={'Debt To Equity'} metricValue={debtToEquity?.debtEquityValue * 100} metricCheck={debtToEquity?.debtEquityCheck} metricScore={debtToEquity?.debtEquityScore} metricRate={debtToEquity?.debtEquityRate} dataFormat={'percentage'} />

                            <Table10PillarsScoreRowHeader metricTitle={'Valuation'} />

                            <Table10PillarsScoreRow metricTitle={'PE Ratio'} metricValue={convertToNumberAndRound(peRatio?.peRatioValue)} metricCheck={peRatio?.peRatioCheck} metricScore={peRatio?.peRatioScore} metricRate={peRatio?.peRatioRate} dataFormat={''} />

                            <Table10PillarsScoreRow metricTitle={'PFCF Ratio'} metricValue={convertToNumberAndRound(pfcfRatio?.pfcfRatioValue)} metricCheck={pfcfRatio?.pfcfRatioCheck} metricScore={pfcfRatio?.pfcfRatioScore} metricRate={pfcfRatio?.pfcfRatioRate} dataFormat={''} />

                            <Table10PillarsScoreRowTotals />

                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        )}
    </>
  );
}
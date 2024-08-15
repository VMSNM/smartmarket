import { useState } from "react";
import { Paper, Stack, Table, TableBody, TableContainer } from "@mui/material";
import { Colors } from "../../../../styles/theme";
import {CustomTableCell, CustomTableHead, CustomTableRow } from "../../../../styles/main";
import TableRowModel from "../../../stockdetails-layout/table-models/TableRowModel";
import { useStockDetailsContext } from "../../../../context/StockDetailsContext";
import { convertToNumberAndRound } from "../../../../utils/useful";
import ShowTableToggle from "../../../stockdetails-layout/show-table-toggle/ShowTableToggle";

const DCFHistoricalData = () => {
    const { value: { stockDetails, keyMetrics }} = useStockDetailsContext();
    const { incomeStatement, cashflowStatement, keyMetricsFMP } = stockDetails;
    const { revenue, netIncome, sharesOut, fcf, peRatio, pfcfRatio } = keyMetrics;

    const [showTable, setShowTable] = useState(false);

    return (
        <>
        <ShowTableToggle tableTitle="Historical Data" showTable={showTable} setShowTable={setShowTable} />
        { showTable && (
            <Stack mb={6}>
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 900, border:`1px solid ${Colors.border}` }} aria-label="customized table">
                    <CustomTableHead variant={'head'}>
                        <CustomTableRow>
                            <CustomTableCell sx={{textAlign:'left'}}>Metric</CustomTableCell>

                            <CustomTableCell>Last 5Yrs</CustomTableCell>

                            { incomeStatement && incomeStatement.slice(0).reverse().map((element, idx) => (
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
                            dataArray={incomeStatement?.slice(0).reverse()} 
                            dataMetric={incomeStatement?.slice(0).reverse().map(record => record.revenue)} 
                            dataFormat={'dollar-compact'} 
                            avg2YrsElement={revenue?.revenueAvg2YRS} 
                            avg5YrsElement={revenue?.revenueAvg5YRS} 
                        />

                        <TableRowModel 
                            title={'Revenue Growth'} 
                            txtStyle={'italic'} 
                            originalArray={incomeStatement} 
                            originalArrayMetric={revenue?.revenueGrowth?.growth?.slice(0).reverse().map(record => record)} 
                            dataArray={incomeStatement?.slice(0).reverse()} 
                            dataMetric={revenue?.revenueGrowth?.growth?.map(record => record * 100)} 
                            dataFormat={'percent'} 
                            avg2YrsElement={revenue?.revenueGrowth?.avg2YRS * 100} 
                            avg5YrsElement={revenue?.revenueGrowth?.avg5YRS * 100} 
                            coloredData={'positive'} rateValueAboveBellow={0} 
                            identLevel={1} 
                        /> 

                        <TableRowModel 
                            title={'Net Income'} 
                            titleBold={true} 
                            originalArray={incomeStatement} 
                            dataArray={incomeStatement?.slice(0).reverse()} 
                            originalArrayMetric={incomeStatement?.map(record => record.netIncome)} 
                            dataMetric={incomeStatement?.slice(0).reverse().map(record => record.netIncome)} 
                            dataFormat={'dollar-compact'} 
                            avg2YrsElement={netIncome?.netIncomeAvg2YRS} 
                            avg5YrsElement={netIncome?.netIncomeAvg5YRS} 
                        />

                        <TableRowModel 
                            title={'NI Growth'} 
                            txtStyle={'italic'} 
                            originalArray={incomeStatement} 
                            originalArrayMetric={netIncome?.netIncomeGrowth?.growth?.slice(0).reverse().map(record => record)} 
                            dataArray={incomeStatement?.slice(0).reverse()} 
                            dataMetric={netIncome?.netIncomeGrowth?.growth?.map(record => record * 100)} 
                            
                            dataFormat={'percent'} 
                            avg2YrsElement={netIncome?.netIncomeGrowth?.avg2YRS * 100} 
                            avg5YrsElement={netIncome?.netIncomeGrowth?.avg5YRS * 100} 
                            coloredData={'positive'} rateValueAboveBellow={0} 
                            positiveDataInverse={false} 
                            identLevel={1} 
                        /> 

                        <TableRowModel 
                            title={'NI Margin'} 
                            txtStyle={'italic'} 
                            originalArray={incomeStatement} 
                            originalArrayMetric={netIncome?.netIncomeMargins?.margins?.slice(0).reverse().map(record => record)} 
                            dataArray={incomeStatement?.slice(0).reverse()} 
                            dataMetric={netIncome?.netIncomeMargins?.margins?.map(record => record * 100)} 
                            
                            dataFormat={'percent'} 
                            avg2YrsElement={netIncome?.netIncomeMargins?.avg2YRS * 100} 
                            avg5YrsElement={netIncome?.netIncomeMargins?.avg5YRS * 100} 
                            coloredData={'positive'} rateValuesMinAvgMax={{max: 20, avg: 10}} 
                            identLevel={1} 
                        /> 

                        <TableRowModel 
                            title={'Shares Outstanding'} 
                            titleBold={true} 
                            originalArray={incomeStatement} 
                            originalArrayMetric={incomeStatement?.map(record => record.weightedAverageShsOutDil)}
                            dataArray={incomeStatement?.slice(0).reverse()} 
                            dataMetric={incomeStatement?.slice(0).reverse().map(record => record.weightedAverageShsOutDil / 1000)}
                            dataFormat={''} 
                            avg2YrsElement={sharesOut?.sharesOutAvg2YRS / 1000} 
                            avg5YrsElement={sharesOut?.sharesOutAvg5YRS / 1000} 
                            positiveDataInverse={true} 
                        />

                        <TableRowModel 
                            title={'Shares Out Growth'} 
                            txtStyle={'italic'} 
                            originalArray={incomeStatement} 
                            originalArrayMetric={sharesOut?.sharesOutGrowth?.growth?.slice(0).reverse().map(record => record)} 
                            dataArray={incomeStatement?.slice(0).reverse()} 
                            dataMetric={sharesOut?.sharesOutGrowth?.growth?.map(record => record * 100)} 
                            dataFormat={'percent'} 
                            avg2YrsElement={sharesOut?.sharesOutGrowth?.avg2YRS * 100} 
                            avg5YrsElement={sharesOut?.sharesOutGrowth?.avg5YRS * 100} 
                            coloredData={'negative'} rateValueAboveBellow={0} 
                            positiveDataInverse={true} 
                            identLevel={1} 
                        /> 

                        <TableRowModel 
                            title={'Free Cash Flow'} 
                            titleBold={true} 
                            originalArray={cashflowStatement} 
                            dataArray={cashflowStatement?.slice(0).reverse()} 
                            originalArrayMetric={cashflowStatement?.map(record => record.freeCashFlow)}
                            dataMetric={cashflowStatement?.slice(0).reverse().map(record => record.freeCashFlow)} 
                            dataFormat={'dollar-compact'} 
                            avg2YrsElement={fcf?.fcfAvg2YRS} 
                            avg5YrsElement={fcf?.fcfAvg5YRS} 
                        />

                        <TableRowModel
                            title={'FCF Growth'} 
                            txtStyle={'italic'} 
                            originalArray={cashflowStatement} 
                            originalArrayMetric={fcf?.fcfGrowth?.growth?.slice(0).reverse().map(record => record)} 
                            dataArray={cashflowStatement?.slice(0).reverse()}  
                            dataMetric={fcf?.fcfGrowth?.growth?.map(record => record * 100)} 
                            dataFormat={'percent'} 
                            avg2YrsElement={fcf?.fcfGrowth?.avg2YRS * 100} 
                            avg5YrsElement={fcf?.fcfGrowth?.avg5YRS * 100} 
                            coloredData={'positive'} rateValueAboveBellow={0} 
                            positiveDataInverse={false} 
                            identLevel={1} 
                        /> 

                        <TableRowModel 
                            title={'FCF Margin'} 
                            txtStyle={'italic'} 
                            originalArray={cashflowStatement} 
                            originalArrayMetric={fcf?.fcfMargins?.margins?.slice(0).reverse().map(record => record)} 
                            dataArray={cashflowStatement?.slice(0).reverse()}  
                            dataMetric={fcf?.fcfMargins?.margins?.map(record => record * 100)} 
                            
                            dataFormat={'percent'} 
                            avg2YrsElement={fcf?.fcfMargins?.avg2YRS * 100} 
                            avg5YrsElement={fcf?.fcfMargins?.avg5YRS * 100} 
                            coloredData={'positive'} rateValuesMinAvgMax={{max: 20, avg: 10}} 
                            identLevel={1} 
                        /> 

                        <TableRowModel 
                                title={'PE Ratio'} 
                                titleBold={true} 
                                originalArray={keyMetricsFMP} 
                                originalArrayMetric={keyMetricsFMP?.map(record => record.peRatio)} 
                                dataArray={keyMetricsFMP} 
                                dataMetric={keyMetricsFMP?.slice(0).reverse().map(record => convertToNumberAndRound(record.peRatio))}
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
                                dataArray={keyMetricsFMP?.slice(0).reverse()} 
                                dataMetric={keyMetricsFMP?.slice(0).reverse().map(record => convertToNumberAndRound(record.pfcfRatio))} 
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
    )
}

export default DCFHistoricalData;
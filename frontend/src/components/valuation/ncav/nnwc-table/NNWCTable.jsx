import { useEffect, useState } from "react";
import { IconButton, Paper, Stack, Table, TableBody, TableContainer } from "@mui/material";
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Colors } from "../../../../styles/theme";
import { BodyTextTitle, CustomTableCell, CustomTableHead, CustomTableRow } from "../../../../styles/main";
import TableRowModel from "../../../stockdetails-layout/table-models/TableRowModel";
import { useStockDetailsContext } from "../../../../context/StockDetailsContext";
import NNWCTableRow from "./NNWCTableRow";
import ShowTableToggle from "../../../stockdetails-layout/show-table-toggle/ShowTableToggle";

const NNWCTable = () => {
    const { value: { stockDetails: { incomeStatement, balanceSheet }}} = useStockDetailsContext();

    const [NNWC, setNNWC] = useState(null);
    const [nnwcDR, setNNWCDR] = useState({
        stInvestments: 0.25,
        accountsReceivable: 0.5,
        inventory: 0.5,
        fixedAssets: 0.75
    });

    useEffect(() => {
        let nnwcArray = balanceSheet?.slice(0).reverse().map((element, idx) => {
            let stInvestments = element.shortTermInvestments - (element.shortTermInvestments * nnwcDR.stInvestments);
            let accountsReceivable = element.netReceivables - (element.netReceivables * nnwcDR.accountsReceivable);
            let inventory = element.inventory - (element.inventory * nnwcDR.inventory);
            let fixedAssets = element.totalNonCurrentAssets - (element.totalNonCurrentAssets * nnwcDR.fixedAssets);
            let total = (element.cashAndCashEquivalents + stInvestments + accountsReceivable + inventory + fixedAssets - element.totalLiabilities) / incomeStatement[idx]?.weightedAverageShsOutDil
            return total;
        });
        setNNWC(nnwcArray);
    }, [nnwcDR]);

    const [showTable, setShowTable] = useState(true);

    return (
        <>        
        <ShowTableToggle tableTitle="NNWC - Net Net Working Capital" showTable={showTable} setShowTable={setShowTable} />
        { showTable && (
            <Stack mb={6}>
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800, border:`1px solid ${Colors.border}` }} aria-label="customized table">
                    <CustomTableHead variant={'head'}>
                        <CustomTableRow>
                            <CustomTableCell sx={{textAlign:'left'}}>Metric</CustomTableCell>

                            <CustomTableCell>Last 5Yrs</CustomTableCell>

                            { incomeStatement && incomeStatement.slice(0).reverse().map((element, idx) => (
                                <CustomTableCell 
                                    key={idx} 
                                    bgColor={idx === incomeStatement?.length -1 ? Colors.secondary : ''} 
                                    txtColor={idx === incomeStatement?.length -1 ? Colors.secondaryBG : ''} 
                                >
                                    {element?.date}
                                </CustomTableCell>
                            ))}

                            <CustomTableCell bgColor={Colors.secondary} txtColor={Colors.secondaryBG} >
                                DR
                            </CustomTableCell>
                            
                        </CustomTableRow>
                    </CustomTableHead>

                    <TableBody>

                        <NNWCTableRow 
                            title={'Cash & Cash Equiv.'} 
                            titleBold={true} 
                            txtStyle={'success'}
                            originalArray={balanceSheet} 
                            originalArrayMetric={balanceSheet?.map(record => record.cashAndCashEquivalents)}
                            dataArray={balanceSheet?.slice(0).reverse()} 
                            dataMetric={balanceSheet?.slice(0).reverse().map(record => record.cashAndCashEquivalents)}
                            dataFormat={'dollar-compact'} 
                        />

                        <NNWCTableRow 
                            title={'ST Investments'} 
                            titleBold={true} 
                            txtStyle={'success'}
                            originalArray={balanceSheet} 
                            originalArrayMetric={balanceSheet?.map(record => record.shortTermInvestments)}
                            dataArray={balanceSheet?.slice(0).reverse()} 
                            dataMetric={balanceSheet?.slice(0).reverse().map(record => record.shortTermInvestments)}
                            dataFormat={'dollar-compact'} 
                            showDiscountRate={true}
                            discountName={'stInvestments'}
                            baseDiscountRate={nnwcDR?.stInvestments}
                            nnwcDR={nnwcDR} setNNWCDR={setNNWCDR}
                        />

                        <NNWCTableRow 
                            title={'Accounts Receivable'} 
                            titleBold={true} 
                            txtStyle={'success'}
                            originalArray={balanceSheet} 
                            originalArrayMetric={balanceSheet?.map(record => record.netReceivables)}
                            dataArray={balanceSheet?.slice(0).reverse()} 
                            dataMetric={balanceSheet?.slice(0).reverse().map(record => record.netReceivables)}
                            dataFormat={'dollar-compact'} 
                            showDiscountRate={true}
                            discountName={'accountsReceivable'}
                            baseDiscountRate={nnwcDR?.accountsReceivable}
                            nnwcDR={nnwcDR} setNNWCDR={setNNWCDR}
                        />

                        <NNWCTableRow 
                            title={'Inventory'} 
                            titleBold={true} 
                            txtStyle={'success'}
                            originalArray={balanceSheet} 
                            originalArrayMetric={balanceSheet?.map(record => record.inventory)}
                            dataArray={balanceSheet?.slice(0).reverse()} 
                            dataMetric={balanceSheet?.slice(0).reverse().map(record => record.inventory)}
                            dataFormat={'dollar-compact'} 
                            showDiscountRate={true}
                            discountName={'inventory'}
                            baseDiscountRate={nnwcDR?.inventory}
                            nnwcDR={nnwcDR} setNNWCDR={setNNWCDR}
                        />

                        <NNWCTableRow 
                            title={'Fixed Assets'} 
                            titleBold={true} 
                            txtStyle={'success_light'}
                            originalArray={balanceSheet} 
                            originalArrayMetric={balanceSheet?.map(record => record.totalNonCurrentAssets)}
                            dataArray={balanceSheet?.slice(0).reverse()} 
                            dataMetric={balanceSheet?.slice(0).reverse().map(record => record.totalNonCurrentAssets)}
                            dataFormat={'dollar-compact'} 
                            showDiscountRate={true}
                            discountName={'fixedAssets'}
                            baseDiscountRate={nnwcDR?.fixedAssets}
                            nnwcDR={nnwcDR} setNNWCDR={setNNWCDR}
                        />

                        <NNWCTableRow 
                            title={'Total Liabilities'} 
                            titleBold={true} 
                            txtStyle={'danger'}
                            originalArray={balanceSheet} 
                            originalArrayMetric={balanceSheet?.map(record => record.totalLiabilities)}
                            dataArray={balanceSheet?.slice(0).reverse()} 
                            dataMetric={balanceSheet?.slice(0).reverse().map(record => record.totalLiabilities)}
                            dataFormat={'dollar-compact'} 
                            positiveDataInverse={true} 
                            /* coloredData={'negative'} rateValueAboveBellow={0}  */
                        />

                        <NNWCTableRow 
                            title={'Shares Outstanding'} 
                            titleBold={true} 
                            originalArray={incomeStatement} 
                            originalArrayMetric={incomeStatement?.map(record => record.weightedAverageShsOutDil)}
                            dataArray={incomeStatement?.slice(0).reverse()} 
                            dataMetric={incomeStatement?.slice(0).reverse().map(record => record.weightedAverageShsOutDil / 1000)}
                            dataFormat={''} 
                            positiveDataInverse={true} 
                        />
                        <NNWCTableRow 
                            title={'NNWC/Share'} 
                            titleBold={true} 
                            txtStyle={'warning'}
                            originalArray={balanceSheet?.slice(0).reverse()} 
                            originalArrayMetric={NNWC?.slice(0).reverse().map(record => record)}
                            dataArray={balanceSheet?.slice(0).reverse()} 
                            dataMetric={NNWC?.map(record => record)}
                            dataFormat={'dollar-compact'} 
                            coloredData={'positive'} rateValueAboveBellow={0} 
                        />
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
        )}
        </>
    )
}

export default NNWCTable;
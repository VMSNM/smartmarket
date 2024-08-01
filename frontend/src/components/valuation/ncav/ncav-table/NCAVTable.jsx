import { useEffect, useState } from "react";
import { IconButton, Paper, Stack, Table, TableBody, TableContainer } from "@mui/material";
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Colors } from "../../../../styles/theme";
import { BodyTextTitle, CustomTableCell, CustomTableHead, CustomTableRow } from "../../../../styles/main";
import TableRowModel from "../../../stockdetails-layout/table-models/TableRowModel";
import { useStockDetailsContext } from "../../../../context/StockDetailsContext";
import ShowTableToggle from "../../../stockdetails-layout/show-table-toggle/ShowTableToggle";

const NCAVTable = () => {
    const { value: { stockDetails: { incomeStatement, balanceSheet }}} = useStockDetailsContext();

    const [NCAV, setNCAV] = useState(null);

    useEffect(() => {
        let ncavArray = balanceSheet?.slice(0).reverse().map((element, idx) => 
            (element?.totalCurrentAssets - element?.totalLiabilities)/incomeStatement[idx]?.weightedAverageShsOutDil
        );
        setNCAV(ncavArray);
    }, [incomeStatement, balanceSheet]);

    const [showTable, setShowTable] = useState(true);

    return (
        <>
        <ShowTableToggle tableTitle="NCAV - Net Current Asset Value" showTable={showTable} setShowTable={setShowTable} />
        { showTable && (
            <Stack mb={6}>
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700, border:`1px solid ${Colors.border}` }} aria-label="customized table">
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
                            
                        </CustomTableRow>
                    </CustomTableHead>

                    <TableBody>

                        <TableRowModel 
                            title={'Current Assets'} 
                            titleBold={true} 
                            txtStyle={'success'}
                            originalArray={balanceSheet} 
                            originalArrayMetric={balanceSheet?.map(record => record.totalCurrentAssets)}
                            dataArray={balanceSheet?.slice(0).reverse()} 
                            dataMetric={balanceSheet?.slice(0).reverse().map(record => record.totalCurrentAssets)}
                            dataFormat={'dollar-compact'} 
                            /* coloredData={'positive'} rateValueAboveBellow={0}  */

                        />

                        <TableRowModel 
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

                        <TableRowModel 
                            title={'Shares Outstanding'} 
                            titleBold={true} 
                            originalArray={incomeStatement} 
                            originalArrayMetric={incomeStatement?.map(record => record.weightedAverageShsOutDil)}
                            dataArray={incomeStatement?.slice(0).reverse()} 
                            dataMetric={incomeStatement?.slice(0).reverse().map(record => record.weightedAverageShsOutDil / 1000)}
                            dataFormat={''} 
                            positiveDataInverse={true} 
                        />
                        <TableRowModel 
                            title={'NCAV/Share'} 
                            titleBold={true} 
                            txtStyle={'warning'}
                            originalArray={balanceSheet?.slice(0).reverse()} 
                            originalArrayMetric={NCAV?.slice(0).reverse().map(record => record)}
                            dataArray={balanceSheet?.slice(0).reverse()} 
                            dataMetric={NCAV?.map(record => record)}
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

export default NCAVTable;
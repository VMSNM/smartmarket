import React, { useEffect, useState } from 'react'
import { useDCFContext } from '../../../../../context/DCFContext';
import { USDollar2Dig } from '../../../../../utils/useful';
import useGetTickerPrice from '../../../../../hooks/stockdetails/useGetTickerPrice';
import { Box, Paper, Table, TableBody, TableContainer } from '@mui/material';
import { CustomTableCell, CustomTableHead, CustomTableRow } from '../../../../../styles/main';
import { Colors } from '../../../../../styles/theme';
import DCFCalculationsTableHeader from './DCFCalculationsTableHeader';
import { DCFCalculationsBox } from '../../../../../styles/dcf-assumptions';

const DCFCalculationsTable = () => {
    const { value: { assumptionsSetup, dcfIV }} = useDCFContext();
    const { loadingTickerPrice, getTickerPrice } = useGetTickerPrice();

    const [currentPrice, setCurrentPrice] = useState(null);
    useEffect(() => { setCurrentPrice(getTickerPrice()); }, []);

    return (
        <>
        <DCFCalculationsBox mt={4}>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 600, border:`1px solid ${Colors.border}` }} aria-label="customized table">
                    <CustomTableHead variant={'head'}>
                        <DCFCalculationsTableHeader />
                    </CustomTableHead>
                    <TableBody>
                        <CustomTableRow>
                            <CustomTableCell sx={{textAlign:'left'}} className='table-title'>
                                {assumptionsSetup?.baseMetric === 'freeCashflow' ? 'FCF Perpetual GR' : 'Net Income Perpetual GR'}
                            </CustomTableCell>
                            <CustomTableCell 
                                /* className='table-title' */
                                txtColor={dcfIV?.PGR?.low >= currentPrice ? Colors.success : Colors.danger}
                            >
                                {USDollar2Dig.format(dcfIV?.PGR?.low)}
                            </CustomTableCell>

                            <CustomTableCell 
                                /* className='table-title' */
                                txtColor={dcfIV?.PGR?.mid >= currentPrice ? Colors.success : Colors.danger}
                            >
                                {USDollar2Dig.format(dcfIV?.PGR?.mid)}
                            </CustomTableCell>

                            <CustomTableCell 
                                /* className='table-title' */
                                txtColor={dcfIV?.PGR?.high >= currentPrice ? Colors.success : Colors.danger}
                            >
                                {USDollar2Dig.format(dcfIV?.PGR?.high)}
                            </CustomTableCell>
                        </CustomTableRow>

                        <CustomTableRow>
                            <CustomTableCell 
                                className='table-title'
                                sx={{textAlign:'left'}}
                            >
                                {assumptionsSetup?.baseMetric === 'freeCashflow' ? 'FCF Multiple' : 'Net Income Multiple'}
                            </CustomTableCell>
                            <CustomTableCell 
                                /* className='table-title' */
                                txtColor={dcfIV?.Multiple?.low >= currentPrice ? Colors.success : Colors.danger}
                            >
                                {USDollar2Dig.format(dcfIV?.Multiple?.low)}
                            </CustomTableCell>

                            <CustomTableCell 
                                /* className='table-title' */
                                txtColor={dcfIV?.Multiple?.mid >= currentPrice ? Colors.success : Colors.danger}
                            >
                                {USDollar2Dig.format(dcfIV?.Multiple?.mid)}
                            </CustomTableCell>

                            <CustomTableCell 
                                /* className='table-title' */
                                txtColor={dcfIV?.Multiple?.high >= currentPrice ? Colors.success : Colors.danger}
                            >
                                {USDollar2Dig.format(dcfIV?.Multiple?.high)}
                            </CustomTableCell>
                        </CustomTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </DCFCalculationsBox>
        </>
    )
}

export default DCFCalculationsTable
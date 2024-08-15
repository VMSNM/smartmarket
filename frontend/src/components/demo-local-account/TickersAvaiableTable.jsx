import { Paper, Table, TableBody, TableContainer, Box, Stack, Divider } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ModalBoxLarge } from '../../../src/styles/modal';
import { Colors } from '../../../src/styles/theme';
import { BodyTextTitle, CustomTableCell, CustomTableHead, CustomTableRow } from '../../../src/styles/main'
import { avaiableTickers } from '../../utils/portfolios';
import ActionBtn from '../viewed-companies/viewed-modal/ActionBtn';
import { useCommonModalContext } from '../../context/CommonModalContext';

const TickersAvaiable = () => {
    const { value: {setCommonModalOpen}} = useCommonModalContext();
    const navigate = useNavigate();
    const tickers = avaiableTickers;

    return (
        <ModalBoxLarge>
            <Stack mb={2}>
                <BodyTextTitle variant='subtitle1'>Companies Avaiable on Demo Account</BodyTextTitle>
                <Divider />
            </Stack>
            <TableContainer component={Paper}>
                <Table sx={{ width: '100%', border:`1px solid ${Colors.border}` }} aria-label="customized table">
                    <CustomTableHead variant={'head'}>
                        <CustomTableRow>
                            <CustomTableCell sx={{textAlign:'left', padding: '8px 16px !important'}}>Ticker</CustomTableCell>
                            <CustomTableCell />
                        </CustomTableRow>
                    </CustomTableHead>

                    <TableBody>
                        { tickers?.map((item, idx) => (
                            <CustomTableRow key={idx}>
                                <CustomTableCell 
                                    sx={{
                                        textAlign:'left',
                                        fontWeight:'bold !important',
                                        padding: '10px 16px !important'
                                    }}
                                >
                                    {item}
                                </CustomTableCell>

                                <CustomTableCell 
                                    onClick={() => { setCommonModalOpen(false); navigate(`/stockDetails/${item}/overview`)}}
                                    sx={{
                                        cursor:'pointer', 
                                        transition:'.7s all', 
                                        padding: '10px 16px !important',
                                        ':hover': {color: `${Colors.secondary} !important`
                                    }}}
                                >
                                    View
                                </CustomTableCell>
                            </CustomTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <ActionBtn />
        </ModalBoxLarge>
    )
}

export default TickersAvaiable
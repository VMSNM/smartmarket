import { Paper, Table, TableBody, TableContainer, Box, Stack, Divider } from '@mui/material'
import React from 'react'
import { BodyText, BodyTextTitle, CustomTableCell, CustomTableHead, CustomTableRow, FormPrimaryActionBtn } from '../../../styles/main'
import { useViewedContext } from '../../../context/ViewedContext';
import { Colors } from '../../../styles/theme';
import { getDaysLeft } from '../../../utils/useful';
import { useNavigate } from 'react-router-dom';
import { ModalBoxLarge } from '../../../styles/modal';
import ActionBtn from './ActionBtn';
import { useCommonModalContext } from '../../../context/CommonModalContext';

const ViewedCompaniesTable = () => {
    const { viewedByUser, viewedLimit: {numberOfDays, numberOfTickers}} = useViewedContext();
    const { value: {setCommonModalOpen}} = useCommonModalContext();
    const navigate = useNavigate();

    return (
        <ModalBoxLarge>
            <Stack mb={2}>
                <BodyTextTitle variant='subtitle1'>Companies Viewed</BodyTextTitle>
                <Divider />
            </Stack>
            <BodyText variant='body1' mb={1}>
                Your current plan is limited to {numberOfTickers} companies every {numberOfDays} days.
            </BodyText>
            <TableContainer component={Paper}>
                <Table sx={{ width: '100%', border:`1px solid ${Colors.border}` }} aria-label="customized table">
                    <CustomTableHead variant={'head'}>
                        <CustomTableRow>
                            <CustomTableCell sx={{textAlign:'left'}}>Ticker</CustomTableCell>
                            <CustomTableCell>Days Left</CustomTableCell>
                            <CustomTableCell />
                        </CustomTableRow>
                    </CustomTableHead>

                    <TableBody>
                        { Array.from(viewedByUser)?.map((item, idx) => (
                            <CustomTableRow key={idx}>
                                <CustomTableCell 
                                    sx={{
                                        textAlign:'left',
                                        fontWeight:'bold !important',

                                    }}
                                >
                                    {item.symbol}
                                </CustomTableCell>

                                <CustomTableCell>
                                    {getDaysLeft(item.createdAt, numberOfDays)} days
                                </CustomTableCell>

                                <CustomTableCell 
                                    onClick={() => { setCommonModalOpen(false); navigate(`/stockDetails/${item?.symbol}/overview`)}}
                                    sx={{cursor:'pointer', transition:'.7s all', ':hover': {color: `${Colors.secondary} !important`}}}
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

export default ViewedCompaniesTable
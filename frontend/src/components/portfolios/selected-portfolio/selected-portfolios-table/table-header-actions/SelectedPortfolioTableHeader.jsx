import React from 'react'
import { BodyTextTitle } from '../../../../../styles/main'
import { SelectedPortfolioHeaderActions } from '../../../../../styles/portfolios/beginner'
import {  Stack } from '@mui/material'
import { useCommonModalContext } from '../../../../../context/CommonModalContext';
import CreateNewHolding from '../create-holding/CreateNewHolding';
import CashPosition from './PortfolioCashPosition';
import AddNewHolding from './AddNewHolding';

const SelectedPortfolioTableHeader = ({portfolio}) => {

    const { value: { setCommonModalOpen, setCommonModalContent }} = useCommonModalContext();

    const openModalCreateNewHolding = () => {
        setCommonModalContent(<CreateNewHolding />)
        setCommonModalOpen(true);
    };

    return (
        <SelectedPortfolioHeaderActions>
            <Stack direction={'row'} alignItems={'center'}>
                <BodyTextTitle variant='subtitle1'>Active Holdings</BodyTextTitle>
                <AddNewHolding openModalCreateNewHolding={openModalCreateNewHolding} />
            </Stack>
            <CashPosition portfolio={portfolio} />
        </SelectedPortfolioHeaderActions>
    )
}

export default SelectedPortfolioTableHeader;
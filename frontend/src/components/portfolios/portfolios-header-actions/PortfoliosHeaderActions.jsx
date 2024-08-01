import { Button, IconButton, Stack, styled } from '@mui/material'
import React, { useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Colors } from '../../../styles/theme'
import { blue, red } from '@mui/material/colors';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { usePortfoliosContext } from '../../../context/PortfoliosContext';
import { useCommonModalContext } from '../../../context/CommonModalContext';
import PortfoliosSelection from './PortfoliosSelection';
import PortfoliosCreateNew from './PortfoliosCreateNew';
import PortfoliosEdit from './PortfoliosEdit';
import PortfoliosDelete from './PortfoliosDelete';
import PortfoliosTypeSelection from './PortfoliosTypeSelection';
import { PortfolioHeaderActions, PortfolioHeaderActionsLeft } from '../../../styles/portfolios/beginner';

const PortfoliosHeaderActions = () => {
    const { value: {portfolios}} = usePortfoliosContext();
    const { value: { setCommonModalOpen, setCommonModalContent }} = useCommonModalContext();

    const openModalCreateNew = () => {
        setCommonModalContent(<PortfoliosCreateNew />)
        setCommonModalOpen(true);
    }

    const openModalUpdateWatchlist = () => {
        setCommonModalContent(<PortfoliosEdit />)
        setCommonModalOpen(true);
    }

    const openModalDeleteWatchlist = () => {
        setCommonModalContent(<PortfoliosDelete />)
        setCommonModalOpen(true);
    }

    return (
        <PortfolioHeaderActions>
            <PortfolioHeaderActionsLeft>
                
                <PortfoliosTypeSelection />

                <PortfoliosSelection />

                <CreateNewBtn onClick={openModalCreateNew} >+ Create new </CreateNewBtn>

            </PortfolioHeaderActionsLeft>
            <Stack direction={'row'} gap={0} alignItems={'center'}>
                <IconButton 
                    disabled={portfolios?.length === 0 ? true : false} 
                    onClick={openModalUpdateWatchlist} 
                    title='Update watchlist'
                >
                    <EditCalendarIcon 
                        sx={{
                            fontSize:'26px',
                            color: Colors.secondary, 
                            transition: '.8s all', 
                            ':hover': { color: blue[500] }
                        }} 
                    />
                </IconButton>

                <IconButton 
                    disabled={portfolios?.length === 0 ? true : false} 
                    onClick={openModalDeleteWatchlist} 
                    title='Delete watchlist'
                >
                    <DeleteForeverIcon 
                        sx={{
                            fontSize:'26px',
                            color: red[500], 
                            transition: '.8s all', 
                            ':hover': { color: Colors.primary }
                        }}  
                    />
                </IconButton>

            </Stack>
        </PortfolioHeaderActions>
    )
}

export default PortfoliosHeaderActions


const CreateNewBtn = styled(Button)({
    textTransform: 'capitalize',
    color: Colors.secondary,
    transition: '.6s all',
    ':hover': {
      color: blue[500],
      background: 'transparent'
    }
  });
import { Button, IconButton, Stack, styled } from '@mui/material'
import React from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useWatchlistsContext } from '../../../context/WatchlistsContext'
import { Colors } from '../../../styles/theme'
import { blue, red } from '@mui/material/colors';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import WatchlistsSelection from './WatchlistsSelection'
import WatchlistsCreateNew from './WatchlistsCreateNew'
import WatchlistsEdit from './WatchlistsEdit'
import WatchlistsDelete from './WatchlistsDelete'
import { useCommonModalContext } from '../../../context/CommonModalContext';
import { PortfolioHeaderActions, PortfolioHeaderActionsLeft } from '../../../styles/portfolios/beginner';

const WatchlistsHeaderActions = () => {
    const { value: {watchlists}} = useWatchlistsContext();
    const { value: { setCommonModalOpen, setCommonModalContent }} = useCommonModalContext();
    
    const openModalCreateNew = () => {
        setCommonModalContent(<WatchlistsCreateNew />)
        setCommonModalOpen(true);
    }

    const openModalUpdateWatchlist = () => {
        setCommonModalContent(<WatchlistsEdit />)
        setCommonModalOpen(true);
    }

    const openModalDeleteWatchlist = () => {
        setCommonModalContent(<WatchlistsDelete />)
        setCommonModalOpen(true);
    }

    return (
        <PortfolioHeaderActions>
            <PortfolioHeaderActionsLeft>

                <WatchlistsSelection />

                <CreateNewBtn onClick={openModalCreateNew} >+ Create new </CreateNewBtn>

            </PortfolioHeaderActionsLeft>
            <Stack direction={'row'} gap={0} alignItems={'center'}>

                <IconButton 
                    disabled={watchlists?.length === 0 ? true : false} 
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
                    disabled={watchlists?.length === 0 ? true : false} 
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

export default WatchlistsHeaderActions


const CreateNewBtn = styled(Button)({
    textTransform: 'capitalize',
    color: Colors.secondary,
    transition: '.6s all',
    ':hover': {
      color: blue[500],
      background: 'transparent'
    }
  });
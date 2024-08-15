import React from 'react'
import useAddRemoveFromWatchlist from '../../../hooks/watchlists/useAddRemoveFromWatchlists';
import { useWatchlistsContext } from '../../../context/WatchlistsContext';
import useGetWatchlistsFromUser from '../../../hooks/watchlists/useGetWatchlistsFromUser';
import { CircularProgress } from '@mui/material';
import { LoadingBox } from '../../../styles/main';
import ConfirmationQuestion from '../../../layouts/common/confirmation-question/ConfirmationQuestion';
import { useCommonModalContext } from '../../../context/CommonModalContext';

const DeleteTickerFromWatchlist = ({tickerSymbol}) => {

    const { value: {watchlistSelected, setWatchlists, setWatchlistSelected}} = useWatchlistsContext();
    const { value: { resetModalContent }} = useCommonModalContext();

    const { loadingUpdateWatchlist, addRemoveFromWatchlist } = useAddRemoveFromWatchlist();
    const { getWatchlistsFromUser } = useGetWatchlistsFromUser();

    const handleAddRemoveFromWatchlist = async () => {
        const dataSelected = await addRemoveFromWatchlist(watchlistSelected, tickerSymbol);
        resetModalContent();
        if (dataSelected) setWatchlistSelected(dataSelected._id);

        const data = await getWatchlistsFromUser();
        if (data) setWatchlists(data);
    }

    return (
    <>
        <ConfirmationQuestion 
        question={`Sure you want to delete ${tickerSymbol}?`}
        alert='danger' 
        extraAlert={'You cannot undo this action'} 
        callbackFn1={handleAddRemoveFromWatchlist} 
        callbackFn2={resetModalContent} 
        loading={loadingUpdateWatchlist}
        />
    </>
    )
}

export default DeleteTickerFromWatchlist
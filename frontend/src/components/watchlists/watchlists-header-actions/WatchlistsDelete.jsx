import React from 'react'
import { CircularProgress } from '@mui/material';
import { useWatchlistsContext } from '../../../context/WatchlistsContext';
import useDeleteWatchlist from '../../../hooks/watchlists/useDeleteWatchlist';
import { LoadingBox } from '../../../styles/main';
import ConfirmationQuestion from '../../../layouts/common/confirmation-question/ConfirmationQuestion';
import { useCommonModalContext } from '../../../context/CommonModalContext';

const WatchlistsDelete = () => {

  const { value: {watchlists, watchlistSelected, setWatchlists, setWatchlistSelected}} = useWatchlistsContext();
  const { value: { resetModalContent }} = useCommonModalContext();
  const { loadingDeleteWatchlist, deleteWatchlist } = useDeleteWatchlist();

  const watchlistName = watchlists?.find(element => element._id === watchlistSelected)

  const handleDeleteWatchlist = async () => {
    const data = await deleteWatchlist(watchlistSelected);
    resetModalContent();
    if (data) {
        setWatchlists(data);
        setWatchlistSelected(data[0]?._id);
        return;
    }
    setWatchlistSelected('');
  }

  return (
    <>
      <ConfirmationQuestion 
        question={`Sure you want to delete ${watchlistName?.name} watchlist?`} 
        alert='danger' 
        extraAlert={'You cannot undo this action'} 
        callbackFn1={handleDeleteWatchlist} 
        callbackFn2={resetModalContent} 
        loading={loadingDeleteWatchlist}
      />
    </>
  )
}

export default WatchlistsDelete
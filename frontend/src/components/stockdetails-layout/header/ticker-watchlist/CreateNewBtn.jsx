import { CircularProgress } from '@mui/material'
import React, { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import toast from 'react-hot-toast';
import useCreateWatchlist from '../../../../hooks/watchlists/useCreateWatchlist';
import useGetWatchlistsFromUser from '../../../../hooks/watchlists/useGetWatchlistsFromUser';
import { useWatchlistsContext } from '../../../../context/WatchlistsContext';
import { BodyText, FormPrimaryActionBtn, LoadingBox } from '../../../../styles/main';
import useAddRemoveFromWatchlist from '../../../../hooks/watchlists/useAddRemoveFromWatchlists';
import { useParams } from 'react-router-dom';

const CreateNewBtn = ({newWatchlistName, setNewWatchlistName}) => {
    const { value: {setWatchlists, setWatchlistSelected}} = useWatchlistsContext();
    const { createWatchlist } = useCreateWatchlist();
    const { addRemoveFromWatchlist } = useAddRemoveFromWatchlist();
    const { getWatchlistsFromUser } = useGetWatchlistsFromUser();
    const { ticker: tickerSymbol } = useParams();
    const [loading, setLoading] = useState(false);

    const handleCreateNew = async () => {
        if (newWatchlistName?.length < 4) return toast.error('Watchlist name must have at least 4 characters');
        
        setLoading(true);
        const newWatchlist = await createWatchlist(newWatchlistName);
        await addRemoveFromWatchlist(newWatchlist?._id, tickerSymbol);

        const data = await getWatchlistsFromUser();
        if (data) setWatchlists(data);
        setNewWatchlistName('');
        setLoading(false);
    }
    
    return (
        <>
        <FormPrimaryActionBtn
            disabled={loading}        
            title={`Create new watchlist`} 
            variant="outlined" 
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleCreateNew}
        >
            {loading ? <CircularProgress size="1.5rem" /> : <BodyText variant='body2'>Create watchlist</BodyText> }            
        </FormPrimaryActionBtn>
        </>
    )
}

export default CreateNewBtn
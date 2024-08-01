import React, { useEffect, useState } from 'react';
import { CircularProgress, Divider, IconButton } from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import { Colors } from '../../../../styles/theme';
import { useWatchlistsContext } from '../../../../context/WatchlistsContext';
import { useParams } from 'react-router-dom';
import useGetWatchlistsFromUser from '../../../../hooks/watchlists/useGetWatchlistsFromUser';
import AddToWatchlistMenu from './AddToWatchlistMenu';
import { LoadingBox } from '../../../../styles/main';

const TickerWatchlist = () => {
  const { value: {watchlists, setWatchlists}} = useWatchlistsContext();
  const { ticker: tickerFeatured } = useParams();

  const [isWatchlisted, setIsWatchlisted] = useState({atLeastOnce: false, inWatchlists: []});
  const [loading, setLoading] = useState(true);

  const { loadingWatchlists, getWatchlistsFromUser } = useGetWatchlistsFromUser();

  const getWatchlists = async () => {
      const data = await getWatchlistsFromUser();
      if (data) setWatchlists(data);
  }
  
  useEffect(() => {
    if (watchlists !== null) {
      checkIfWatchlisted(watchlists, setIsWatchlisted, tickerFeatured, setLoading)
      return;
    }
    getWatchlists();
  }, [watchlists]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openAddToWatchlistMenu = Boolean(anchorEl);

  return (
    <>
    {loading || loadingWatchlists && (
      <LoadingBox>
        <CircularProgress />
      </LoadingBox>
    )}
    {!loading && !loadingWatchlists && (
      <>
      <IconButton 
        title={'Add/remove from whatchlist'} 
        sx={{position: 'inherit'}} 
        onClick={(e) => {e.preventDefault(); setAnchorEl(e.currentTarget)}}
      >
          { isWatchlisted.atLeastOnce && 
            <StarRoundedIcon sx={watchlistBtnStyle} />  
          }

          { !isWatchlisted.atLeastOnce && 
            <StarBorderRoundedIcon sx={watchlistBtnStyle} />  
          }
      </IconButton>

      <AddToWatchlistMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} openAddToWatchlistMenu={openAddToWatchlistMenu} watchlists={watchlists} isWatchlisted={isWatchlisted} />
      </>
    )}
    </>
  )
}

export default TickerWatchlist;

const checkIfWatchlisted = (watchlists, setIsWatchlisted, tickerFeatured, setLoading) => {
  
  let watchlistedArray = watchlists?.map(element => element.tickers.some(ticker => ticker.symbol === tickerFeatured));

  setIsWatchlisted({
    atLeastOnce: watchlistedArray.indexOf(true) >= 0 ? true : false,
    inWatchlists: watchlistedArray
  })
  setLoading(false);
}

const watchlistBtnStyle = {
  color: Colors.primary,
  fontSize: '2rem', 
  cursor:'pointer', 
  transition: '1s', 
  ':hover': { color: Colors.secondary }
}
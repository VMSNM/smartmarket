import { CircularProgress, Divider, Menu, MenuItem, Stack } from '@mui/material'
import React from 'react'
import { BodyText, BodyTextTitle, LoadingBox } from '../../../../styles/main'
import { Colors } from '../../../../styles/theme';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import { useWatchlistsContext } from '../../../../context/WatchlistsContext';
import useGetWatchlistsFromUser from '../../../../hooks/watchlists/useGetWatchlistsFromUser';
import useAddRemoveFromWatchlist from '../../../../hooks/watchlists/useAddRemoveFromWatchlists';
import { useParams } from 'react-router-dom';
import CreateNewSection from './CreateNewSection';

const AddToWatchlistMenu = ({anchorEl, setAnchorEl, openAddToWatchlistMenu, watchlists, isWatchlisted}) => {
    const { value: {setWatchlists}} = useWatchlistsContext();
    const { loadingUpdateWatchlist, addRemoveFromWatchlist } = useAddRemoveFromWatchlist();
    const { loadingWatchlists, getWatchlistsFromUser } = useGetWatchlistsFromUser();
    const { ticker: tickerSymbol } = useParams();

    const handleAddRemoveFromWatchlist = async (watchlistID) => {
        await addRemoveFromWatchlist(watchlistID, tickerSymbol);

        const data = await getWatchlistsFromUser();
        if (data) setWatchlists(data);
    }

    const stopImmediatePropagation = (e) => {
        e.stopPropagation();
        e.preventDefault();
      };

    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openAddToWatchlistMenu}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{'aria-labelledby': 'basic-button'}} sx={{ marginTop:'15px', boxShadow: '1px 1px 3px #000' }}
        >
            <Stack p={2} mb={1} minWidth={'300px'} maxWidth={'450px'}>
                <BodyTextTitle variant='subtitle1'>Your watchlists</BodyTextTitle>
                <Divider />
            </Stack>
            { loadingWatchlists && (
                <LoadingBox>
                    <CircularProgress />
                </LoadingBox>
            )}
            { !loadingWatchlists && watchlists?.map((element, idx) => (
                <MenuItem 
                    key={idx}
                    onClick={() => handleAddRemoveFromWatchlist(element._id)}
                >
                    <Stack direction={'row'} width={'100%'} justifyContent={'space-between'} alignItems={'flex-end'} gap={2}>
                        <BodyText>{element.name}</BodyText>
                        
                        { loadingUpdateWatchlist && (
                            <LoadingBox customHeight={'24px'}>
                                <CircularProgress size="1.5rem" />
                            </LoadingBox>
                        )}
                        { !loadingUpdateWatchlist && isWatchlisted.inWatchlists[idx] === true && <StarRoundedIcon sx={{ color:Colors.primary, fontSize: '1.5rem', cursor:'pointer', transition: '.6s', ':hover': { color: Colors.secondary } }} />  }

                        { !loadingUpdateWatchlist && isWatchlisted.inWatchlists[idx] === false && <StarBorderRoundedIcon sx={{ color:Colors.primary, fontSize: '1.5rem', cursor:'pointer', transition: '.6s', ':hover': { color: Colors.secondary } }} />  }
                    </Stack>
                </MenuItem>
            ))}
            <CreateNewSection />
        </Menu>
    )
}

export default AddToWatchlistMenu
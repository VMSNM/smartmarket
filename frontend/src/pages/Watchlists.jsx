import { BodyText, LoadingBox } from '../styles/main';
import LayoutTitle from '../layouts/common/LayoutTitle';
import { CircularProgress, Stack } from '@mui/material';
import useGetWatchlistsFromUser from '../hooks/watchlists/useGetWatchlistsFromUser';
import { useEffect } from 'react';
import WatchlistsHeaderActions from '../components/watchlists/watchlists-header-actions/WatchlistsHeaderActions';
import { useWatchlistsContext } from '../context/WatchlistsContext';
import SelectedWatchlistTable from '../components/watchlists/watchlists-table/SelectedWatchlistTable';
import DemoAccountBtn from '../components/common/DemoAccountBtn';
import { watchlistDemoLimitations } from '../utils/messages';
import { useAuthContext } from '../context/AuthContext';

const Watchlists = () => {
    const { authUser } = useAuthContext();
    const { value: {watchlists, setWatchlists, setWatchlistSelected}} = useWatchlistsContext();
    const { loadingWatchlists, getWatchlistsFromUser } = useGetWatchlistsFromUser();
    const wachlistLimitations = watchlistDemoLimitations;

    const getWatchlists = async () => {
        const data = await getWatchlistsFromUser();
        if (data) {
            setWatchlists(data);
            (data.length > 0) ? setWatchlistSelected(data[0]?._id) : setWatchlistSelected('');
            return;
        }
        setWatchlistSelected('');
    }

    useEffect(() => {
        getWatchlists();
        /*  */
        /* watchlists === null ? getWatchlists() : setWatchlistSelected(watchlists[0]?._id); */
    }, []);

    return (
    <>
        <Stack mb={4}>
            <LayoutTitle title={'Your '} titleSpan={'Watchlists'} />
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={1}>
                <BodyText variant='body1'>
                    Check and modify your watchlists, tickers, notes and price targets below!
                </BodyText>
                {/* { authUser?.role === 'guest' && ( */}
                    <DemoAccountBtn 
                        msg={wachlistLimitations?.msg} 
                        limitations={wachlistLimitations?.limitations} 
                    />
                {/* )} */}
            </Stack>
        </Stack>

        { loadingWatchlists && (
            <LoadingBox>
                <CircularProgress />
            </LoadingBox>
        )}

        { !loadingWatchlists && watchlists && (
            <>  
                <WatchlistsHeaderActions />

                { watchlists?.length === 0  && <BodyText variant='subtitle2'>No watchlists created yet</BodyText> }

                { watchlists.length > 0 && <SelectedWatchlistTable /> }
            </>
        )}
    </>
    )
}

export default Watchlists;
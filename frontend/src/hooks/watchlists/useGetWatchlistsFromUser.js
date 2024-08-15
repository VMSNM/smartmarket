import { toast } from 'react-hot-toast';
import { useAuthContext } from '../../context/AuthContext';
import { useState } from 'react';

const useGetWatchlistsFromUser = () => {
    const { authUser } = useAuthContext();
    const [loadingWatchlists, setLoadingWatchlists] = useState(false);
    let data = null;

    const getWatchlistsFromUser = async () => {
        setLoadingWatchlists(true);
        try {
            const result = await fetch(`/api/watchlists/user/${authUser?.username}`);
            data = await result.json();
            if (data.error) {
                throw new Error(data.error);
            }
        } catch (error) {
            toast.error(error);
        } finally {
            setLoadingWatchlists(false);
        }
        return data;
    }
    return { loadingWatchlists, getWatchlistsFromUser }
}

export default useGetWatchlistsFromUser;
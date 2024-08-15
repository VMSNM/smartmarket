import { toast } from 'react-hot-toast';
import { useState } from 'react';

const useCreateWatchlist = () => {
    const [loadingCreateWatchlist, setLoadingCreateWatchlist] = useState(false);

    const createWatchlist = async (watchlistName, watchlistDescription = '') => {
        setLoadingCreateWatchlist(true);
        let data = null;
        const newWatchlist = {
            name: watchlistName,
            description: watchlistDescription
        }
        try {
            const result = await fetch(`/api/watchlists/create`, {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json", "Access-Control-Allow-Origin": "+",
                },
                body: JSON.stringify(newWatchlist),
            });
            data = await result.json();
            if (data.error) {
                throw new Error(data.error);
            }   
            toast.success(data.message);
        } catch (error) {
            toast.error(error);
        } finally {
            setLoadingCreateWatchlist(false);
        }
        return data?.result;
    }
    return { loadingCreateWatchlist, createWatchlist }
}

export default useCreateWatchlist;
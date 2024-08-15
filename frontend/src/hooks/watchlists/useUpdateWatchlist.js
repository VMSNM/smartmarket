import { toast } from 'react-hot-toast';
import { useState } from 'react';

const useUpdateWatchlist = () => {
    const [loadingUpdateWatchlist, setLoadingUpdateWatchlist] = useState(false);

    const updateWatchlist = async (watchlistID, watchlistName, watchlistDescription = '') => {
        setLoadingUpdateWatchlist(true);
        let data = null;
        const updatedData = {
            name: watchlistName,
            description: watchlistDescription
        }
        try {
            const result = await fetch(`/api/watchlists/update/${watchlistID}`, {
                method: "PUT",
                crossDomain: true,
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json", "Access-Control-Allow-Origin": "+",
                },
                body: JSON.stringify(updatedData),
            });
            data = await result.json();
            if (data.error) {
                throw new Error(data.error);
            }   
            toast.success(data.message);
        } catch (error) {
            toast.error(error);
        } finally {
            setLoadingUpdateWatchlist(false);
        }
        return data?.result;
    }
    return { loadingUpdateWatchlist, updateWatchlist }
}

export default useUpdateWatchlist;
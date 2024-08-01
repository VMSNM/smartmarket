import { toast } from 'react-hot-toast';
import { useState } from 'react';

const useDeleteWatchlist = () => {
    const [loadingDeleteWatchlist, setLoadingDeleteWatchlist] = useState(false);
    let data = null;

    const deleteWatchlist = async (watchlistID) => {
        setLoadingDeleteWatchlist(true);
        try {
            const result = await fetch(`/api/watchlists/delete/${watchlistID}`, {
                method: "DELETE",
                crossDomain: true,
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json", "Access-Control-Allow-Origin": "+",
                }
            });
            data = await result.json();
            if (data.error) {
                throw new Error(data.error);
            }   
            toast.success(data.message);
        } catch (error) {
            toast.error(error);
        } finally {
            setLoadingDeleteWatchlist(false);
        }
        return data?.result;
    }
    return { loadingDeleteWatchlist, deleteWatchlist }
}

export default useDeleteWatchlist;
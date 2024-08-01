import { toast } from 'react-hot-toast';
import { useState } from 'react';

const useAddRemoveFromWatchlist = () => {
    const [loadingUpdateWatchlist, setLoadingUpdateWatchlist] = useState(false);
    let data = null;

    const addRemoveFromWatchlist = async (watchlistID, tickerSymbol) => {
        setLoadingUpdateWatchlist(true);
        try {
            let backEndData = {
                tickerSymbol: tickerSymbol
            }
            const result = await fetch(`/api/watchlists/addremoveticker/${watchlistID}`, {
                method: "PUT",
                crossDomain: true,
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json", "Access-Control-Allow-Origin": "+",
                },
                body: JSON.stringify(backEndData),
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
    return { loadingUpdateWatchlist, addRemoveFromWatchlist }
}

export default useAddRemoveFromWatchlist;
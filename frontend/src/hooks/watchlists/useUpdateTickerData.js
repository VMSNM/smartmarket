import { toast } from 'react-hot-toast';
import { useState } from 'react';

const useUpdateTickerData = () => {
    const [loadingUpdateTickerData, setLoadingUpdateTickerData] = useState(false);

    const updateTickerData = async (watchlistID, tickerSymbol, priceTarget = 0, notes = '', checkboxed = false) => {
        setLoadingUpdateTickerData(true);
        let data = null;
        const updatedData = {
            tickerSymbol: tickerSymbol,
            priceTarget: priceTarget,
            notes: notes,
            checkboxed: checkboxed
        }
        try {
            const result = await fetch(`/api/watchlists/update-tickerdata/${watchlistID}`, {
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
            setLoadingUpdateTickerData(false);
        }
        return data?.result;
    }
    return { loadingUpdateTickerData, updateTickerData }
}

export default useUpdateTickerData;
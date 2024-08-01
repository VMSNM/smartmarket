import { toast } from 'react-hot-toast';
import { useState } from 'react';

const useAddToViewed = () => {
    const [loadingAddedToViewed, setLoadingAddToViewed] = useState(false);

    const addToViewed = async (tickerSymbol) => {
        setLoadingAddToViewed(true);
        let data = null;
        const newTicker = { tickerSymbol: tickerSymbol }
        try {
            const result = await fetch(`/api/viewed/addticker`, {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json", "Access-Control-Allow-Origin": "+",
                },
                body: JSON.stringify(newTicker),
            });
            data = await result.json();
            if (data.error) {
                throw new Error(data.error);
            }   
            toast.success(data.message);
        } catch (error) {
            toast.error(error);
        } finally {
            setLoadingAddToViewed(false);
        }
        return data?.result;
    }
    return { loadingAddedToViewed, addToViewed }
}

export default useAddToViewed;
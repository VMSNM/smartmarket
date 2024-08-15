import { toast } from 'react-hot-toast';
import { useState } from 'react';

const useAddRemoveFromPortfolio = () => {
    const [loadingAddRemove, setLoadingAddRemove] = useState(false);
    let data = null;

    const addRemoveFromPortfolio = async (portfolioID, tickerSymbol, sharesCount = 1, avgBuyPrice = 1, tickerName = '') => {
        setLoadingAddRemove(true);
        try {
            let backEndData = {
                tickerSymbol: tickerSymbol,
                tickerName: tickerName,
                sharesCount: sharesCount,
                avgBuyPrice: avgBuyPrice
            }
            const result = await fetch(`/api/portfolios/addremoveticker/${portfolioID}`, {
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
            setLoadingAddRemove(false);
        }
        return data?.result;
    }
    return { loadingAddRemove, addRemoveFromPortfolio }
}

export default useAddRemoveFromPortfolio;
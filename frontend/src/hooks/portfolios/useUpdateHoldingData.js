import { toast } from 'react-hot-toast';
import { useState } from 'react';

const useUpdateHoldingData = () => {
    const [loadingUpdateHoldingData, setLoadingUpdateHoldingData] = useState(false);

    const updateHoldingData = async (portfolioID, tickerSymbol, sharesCount = 1, avgBuyPrice = 1, notes = '') => {
        setLoadingUpdateHoldingData(true);
        let data = null;
        const updatedData = {
            tickerSymbol: tickerSymbol,
            sharesCount: sharesCount,
            avgBuyPrice: avgBuyPrice,
            notes: notes,
        }
        try {
            const result = await fetch(`/api/portfolios/update-holdingdata/${portfolioID}`, {
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
            setLoadingUpdateHoldingData(false);
        }
        return data?.result;
    }
    return { loadingUpdateHoldingData, updateHoldingData }
}

export default useUpdateHoldingData;
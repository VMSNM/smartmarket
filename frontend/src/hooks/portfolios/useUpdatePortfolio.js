import { toast } from 'react-hot-toast';
import { useState } from 'react';

const useUpdatePortfolio = () => {
    const [loadingUpdatePortfolio, setLoadingUpdatePortfolio] = useState(false);

    const updatePortfolio = async (portfolioID, portfolioName, portfolioDescription = '', cashPosition = 0) => {
        setLoadingUpdatePortfolio(true);
        let data = null;
        const updatedData = {
            name: portfolioName,
            description: portfolioDescription,
            cashPosition: cashPosition
        }
        try {
            const result = await fetch(`/api/portfolios/update/${portfolioID}`, {
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
            setLoadingUpdatePortfolio(false);
        }
        return data?.result;
    }
    return { loadingUpdatePortfolio, updatePortfolio }
}

export default useUpdatePortfolio;
import { toast } from 'react-hot-toast';
import { useState } from 'react';

const useCreatePortfolio = () => {
    const [loadingCreatePortfolio, setLoadingCreatePortfolio] = useState(false);

    const createPortfolio = async (portfolioName, portfolioDescription = '') => {
        setLoadingCreatePortfolio(true);
        let data = null;
        const newPortfolio = {
            name: portfolioName,
            description: portfolioDescription
        }
        try {
            const result = await fetch(`/api/portfolios/create`, {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json", "Access-Control-Allow-Origin": "+",
                },
                body: JSON.stringify(newPortfolio),
            });
            data = await result.json();
            if (data.error) {
                throw new Error(data.error);
            }   
            toast.success(data.message);
        } catch (error) {
            toast.error(error);
        } finally {
            setLoadingCreatePortfolio(false);
        }
        return data?.result;
    }
    return { loadingCreatePortfolio, createPortfolio }
}

export default useCreatePortfolio;
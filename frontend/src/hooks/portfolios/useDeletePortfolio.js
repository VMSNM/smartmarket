import { toast } from 'react-hot-toast';
import { useState } from 'react';

const useDeletePortfolio = () => {
    const [loadingDeletePortfolio, setLoadingDeletePortfolio] = useState(false);
    let data = null;

    const deletePortfolio = async (portfolioID) => {
        setLoadingDeletePortfolio(true);
        try {
            const result = await fetch(`/api/portfolios/delete/${portfolioID}`, {
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
            setLoadingDeletePortfolio(false);
        }
        return data?.result;
    }
    return { loadingDeletePortfolio, deletePortfolio }
}

export default useDeletePortfolio;
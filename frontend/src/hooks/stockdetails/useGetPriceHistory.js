import { useState } from "react"
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const useGetPriceHistory = () => {
    const [loadingPriceHistory, setLoadingPriceHistory] = useState(false);
    const { ticker } = useParams();
    let data = null;

    const getPriceHistory = async () => {
        setLoadingPriceHistory(true);
        try {
            const result = await fetch(`/api/stockdetails/${ticker}/pricehistory`);
            data = await result.json();

            if (data.error) {
                throw new Error(data.error);
            }

            let { dataDates, dataPrices } = data;
            localStorage.setItem('priceaction-dates', JSON.stringify(dataDates.reverse()));
            localStorage.setItem('priceaction-prices', JSON.stringify(dataPrices.reverse()));

        } catch (error) {
            toast.error(error);
        } finally {
            setLoadingPriceHistory(false);
        }
        return data;
    }

    return { loadingPriceHistory, getPriceHistory }
}

export default useGetPriceHistory;
import { useState } from "react"
import { toast } from 'react-hot-toast';

const useGetTickerCurrentPrice = () => {
    const [loadingTickerPrice, setLoadingTickerPrice] = useState(false);
    let data = null;
    let currentPrice = 0;
    let yesterdayPrice = 0;

    const getTickerCurrentPrice = async (tickerSymbol) => {
        setLoadingTickerPrice(true);
        try {
            const result = await fetch(`/api/portfolios/${tickerSymbol}/priceaction`);
            data = await result.json();

            if (data.error) {
                throw new Error(data.error);
            }
            currentPrice = data?.dataPrices[0];
            yesterdayPrice = data?.dataPrices[1];
        } catch (error) {
            toast.error(error);
        } finally {
            setLoadingTickerPrice(false);
        }
        return {currentPrice, yesterdayPrice};
    }

    return { loadingTickerPrice, getTickerCurrentPrice }
}

export default useGetTickerCurrentPrice;
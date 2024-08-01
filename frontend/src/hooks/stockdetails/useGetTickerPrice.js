import { useEffect, useState } from "react"
import { toast } from 'react-hot-toast';
import { useStockDetailsContext } from "../../context/StockDetailsContext";
import { useDCFContext } from "../../context/DCFContext";

const useGetTickerPrice = () => {
    const { value: {stockDetails: {priceActionPrices}}} = useStockDetailsContext();
    const [loadingTickerPrice, setLoadingTickerPrice] = useState(false);

    let tickerPrice = null;

    const getTickerPrice = () => {
        setLoadingTickerPrice(true);
        try {
            tickerPrice = priceActionPrices[priceActionPrices?.length -1];
            setLoadingTickerPrice(false);
        } catch (error) {
            toast.error(error);
        } finally {
            setLoadingTickerPrice(false);
        }
        return tickerPrice;
    }

    return { loadingTickerPrice, getTickerPrice }
}

export default useGetTickerPrice;
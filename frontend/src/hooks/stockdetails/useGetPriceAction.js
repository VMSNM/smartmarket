import { useState } from "react"
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useStockDetailsContext } from "../../context/StockDetailsContext";

const useGetPriceAction = () => {
    const [loading, setLoading] = useState(false);
    const { ticker } = useParams();
    const { value: { updatePriceAction }} = useStockDetailsContext();

    const getPriceAction = async () => {
        setLoading(true);
        try {
            const result = await fetch(`/api/stockdetails/${ticker}/priceaction`);
            const data = await result.json();

            if (data.error) {
                throw new Error(data.error);
            }

            let { dataDates, dataPrices } = data;
            localStorage.setItem('priceaction-dates', JSON.stringify(dataDates.slice(0,1300).reverse()));
            localStorage.setItem('priceaction-prices', JSON.stringify(dataPrices.slice(0,1300).reverse()));
            /* updatePriceAction(); */

        } catch (error) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
    }

    return { loading, getPriceAction }
}

export default useGetPriceAction;
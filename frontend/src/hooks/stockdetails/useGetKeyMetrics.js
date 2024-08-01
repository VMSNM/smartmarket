/* import { useState } from "react"
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useStockDetailsContext } from "../../context/StockDetailsContext";

const useGetKeyMetrics = () => {
    const [loading, setLoading] = useState(false);
    const { ticker } = useParams();
    const { value: { tickerFeatured, keyMetrics, setKeyMetrics } } = useStockDetailsContext();

    const getKeyMetrics = async () => {
        setLoading(true);
        try {
            if (keyMetrics && tickerFeatured.toLowerCase() === ticker.toLocaleLowerCase()) {
                console.log('Local Storage Key Metrics Controller');
                setLoading(false);
                return;
            }

            console.log('Fetch API Key Metrics Controller')
            const result = await fetch(`/api/stockdetails/${ticker}/keymetrics`);
            const data = await result.json();

            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem('key-metrics', JSON.stringify(data));
            setKeyMetrics(data);

        } catch (error) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
    }

    return { loading, getKeyMetrics }
}

export default useGetKeyMetrics; */
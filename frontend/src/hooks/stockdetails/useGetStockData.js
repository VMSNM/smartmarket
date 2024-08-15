import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const useGetStockData = () => {
    const { ticker } = useParams();
    let data = null;
    const getStockData = async (endPoint, localStorageName) => {
        try {
            const result = await fetch(`/api/stockdetails/${ticker}/${endPoint}`);
            data = await result.json();

            if (data.error) {
                throw new Error(data.error);
            }
            localStorage.setItem(localStorageName, JSON.stringify(data));
        } catch (error) {
            toast.error(error);
        } 
        return data;
    }
    return { getStockData }
}

export default useGetStockData;
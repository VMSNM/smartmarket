import { toast } from 'react-hot-toast';
import { useAuthContext } from '../../context/AuthContext';
import { useState } from 'react';

const useGetPortfoliosFromUser = () => {
    const { authUser } = useAuthContext();
    const [loadingPortfolios, setLoadingPortfolios] = useState(false);
    let data = null;

    const getPortfoliosFromUser = async () => {
        setLoadingPortfolios(true);
        try {
            const result = await fetch(`/api/portfolios/user/${authUser?.username}`);
            data = await result.json();
            if (data.error) {
                throw new Error(data.error);
            }
        } catch (error) {
            toast.error(error);
        } finally {
            setLoadingPortfolios(false);
        }
        return data;
    }
    return { loadingPortfolios, getPortfoliosFromUser }
}

export default useGetPortfoliosFromUser;
import { toast } from 'react-hot-toast';
import { useState } from 'react';

const useGetViewedByUser = () => {
    const [loadingViewed, setLoadingViewed] = useState(false);
    let data = null;

    const getViewedByUser = async (userID) => {
        setLoadingViewed(true);
        try {
            const result = await fetch(`/api/viewed/user/${userID}`);
            data = await result.json();
            if (data.error) {
                throw new Error(data.error);
            }
        } catch (error) {
            toast.error(error);
        } finally {
            setLoadingViewed(false);
        }
        return data;
    }
    return { loadingViewed, getViewedByUser }
}

export default useGetViewedByUser;
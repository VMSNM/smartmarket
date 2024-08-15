import toast from "react-hot-toast";
import ViewedCompaniesTable from "../../viewed-companies/viewed-modal/ViewedCompaniesTable";

export const validateViewed = (viewed, setViewedByUser, ticker, numberOfTickers, setCommonModalContent, setCommonModalOpen, setLimitReached) => {
    let validRequest = true;
    if (!viewed) return validRequest = false;

    if (viewed) {
        localStorage.setItem('viewed-companies', JSON.stringify(viewed));
        setViewedByUser(viewed);
    }

    const alreadyViewed = viewed?.some(item => item.symbol === ticker);
    if (viewed.length >= numberOfTickers && !alreadyViewed) {
        setCommonModalContent(<ViewedCompaniesTable />);
        setCommonModalOpen(true);
        setLimitReached(true);
        validRequest = false;
        toast.error('Plan limit reached');
    };
    return { validRequest, alreadyViewed };
}
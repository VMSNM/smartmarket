import { useState } from "react"
import { toast } from 'react-hot-toast';
import { useStockDetailsContext } from "../../context/StockDetailsContext";

const useGetIntrinsicValue = () => {
    const [loadingIV, setLoadingIV] = useState(false);
    const { value: { stockDetails: { incomeStatement, balanceSheet }, baseDCFSetup}} = useStockDetailsContext();

    let intrinsicValue;

    const getIntrinsicValue = () => {
        setLoadingIV(true);
        try {
            intrinsicValue = calculateBaseValues(baseDCFSetup, incomeStatement, balanceSheet);
        } catch (error) {
            toast.error(error);
        } finally {
            setLoadingIV(false);
        }
        return intrinsicValue;
    }

    return { loadingIV, getIntrinsicValue }
}

export default useGetIntrinsicValue;

const calculateBaseValues = (baseDCFSetup, incomeStatement, balanceSheet) => {
    let baseValue = baseDCFSetup?.baseValue;
    let fcfGrowth = baseDCFSetup?.fcfGrowthMid / 100;
    let sharesOutGrowth = baseDCFSetup?.sharesOutGrowthMid / 100;
    let netCashPosition = balanceSheet[0]?.cashAndShortTermInvestments - balanceSheet[0]?.totalDebt;
    let discountRate = baseDCFSetup?.discountRateMid / 100;
    let perpetualGR = baseDCFSetup?.perpetualGRMid / 100;
    
    let fcfYear5 = baseValue * Math.pow(1 + fcfGrowth, 5);
    let sharesYear5 = incomeStatement[0]?.weightedAverageShsOutDil * Math.pow(1 + sharesOutGrowth, 5);
    let finalValue = fcfYear5 * (1+discountRate)/(discountRate-perpetualGR)
    let intrinsicValue = (finalValue + netCashPosition) / sharesYear5;

    return intrinsicValue;
}
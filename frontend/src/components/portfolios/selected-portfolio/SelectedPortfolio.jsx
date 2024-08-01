import React, { useEffect, useState } from 'react';
import SelectedPortfolioTableHeader from './selected-portfolios-table/table-header-actions/SelectedPortfolioTableHeader';
import SelectedPortfolioTableData from './selected-portfolios-table/SelectedPortfolioTableData';
import { usePortfoliosContext } from '../../../context/PortfoliosContext';
import useGetTickerCurrentPrice from '../../../hooks/portfolios/useGetTickerCurrentPrice';
import { LoadingBox } from '../../../styles/main';
import { CircularProgress } from '@mui/material';
import { handlePortfolioSetup } from './PortfolioSetup';
import { BeginnerPortfolioHeaderBox } from '../../../styles/portfolios/beginner';
import Summary from './summary/Summary';
import HoldingsChart from './holdings-chart/HoldingsChart';

const SelectedPortfolio = () => {
    const { value: { portfolios, portfolioSelected }} = usePortfoliosContext();
    const { getTickerCurrentPrice } = useGetTickerCurrentPrice();
    
    const [loading, setLoading] = useState(true);
    const [portfolio, setPortfolio] = useState(null);

    const setupPortfolio = async (portfolioFeatured) => {
        await handlePortfolioSetup(portfolioFeatured, getTickerCurrentPrice, setPortfolio);
        setLoading(false);
    }

    useEffect(() => {
        let portfolioFeatured = portfolios?.find(element => element._id === portfolioSelected);
        setupPortfolio(portfolioFeatured);
      }, [portfolioSelected, portfolios]);
    
    return (
        <>
        { loading && <LoadingBox><CircularProgress /></LoadingBox> }

        { !loading && portfolio && (
            <>
            { (portfolio?.tickers?.length > 0 || portfolio?.cashPosition > 0) && (
                <BeginnerPortfolioHeaderBox sx={{marginTop:'40px', marginBottom:'40px'}}>
                    <Summary portfolio={portfolio} />
                    <HoldingsChart portfolio={portfolio} />
                </BeginnerPortfolioHeaderBox>
            )}

            <SelectedPortfolioTableHeader portfolio={portfolio} setPortfolio={setPortfolio} />
            <SelectedPortfolioTableData portfolio={portfolio} /> 
            </>
        )}
        </>
    )
}

export default SelectedPortfolio
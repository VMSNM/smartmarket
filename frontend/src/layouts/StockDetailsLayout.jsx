import { useEffect, useState } from 'react';
import { Outlet, useParams} from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { LoadingBox } from '../styles/main';
import { StockDetailsBox, StockDetailsSection1, StockDetailsSection2 } from '../styles/stockdetails-layout';
// CONTEXT
import { TablesActionBtnsContextProvider } from '../context/TablesActionBtnsContext';
// COMPONENTS
import StockDetailsHeader from '../components/stockdetails-layout/header/StockDetailsHeader';
import StockDetailsPriceAction from '../components/stockdetails-layout/priceaction-chart/StockDetailsPriceAction';
import StockDetailsKeyMetrics from '../components/stockdetails-layout/keymetrics/StockDetailsKeyMetrics';
import StockDetailsProfile from '../components/stockdetails-layout/profile/StockDetailsProfile';
import StockDetailsTabs from '../components/stockdetails-layout/tabs/StockDetailsTabs';
import FetchCalculateStockDetails from '../components/stockdetails-layout/fetch-and-calculations/FetchCalculateStockDetails';
import ViewedCompanies from '../components/viewed-companies/ViewedCompanies';
import DemoLocalAccount from '../components/demo-local-account/DemoLocalAccount';

const StockDetailsLayout = () => {
  const [loading, setLoading] = useState(true);
  const [limitReached, setLimitReached] = useState(false);
  const [demoLocalAccountAlert, setDemoLocalAccountAlert] = useState(false);

  return (
    <>
      <FetchCalculateStockDetails setLoading={setLoading} setLimitReached={setLimitReached} setDemoLocalAccountAlert={setDemoLocalAccountAlert} />
      { limitReached 
        ?  <ViewedCompanies viewedLoaded={true} />
        : demoLocalAccountAlert
        ? <DemoLocalAccount />
        :
        <>
          { loading
            ? 
              <LoadingBox>
                <CircularProgress sx={{width: '40px', height: '40px'}} /> 
              </LoadingBox>
            :
            <>
              <StockDetailsHeader />

              <StockDetailsSection1>
                <StockDetailsBox>
                  <StockDetailsPriceAction />
                </StockDetailsBox>

                <StockDetailsBox>
                  <StockDetailsKeyMetrics />  
                </StockDetailsBox>
              </StockDetailsSection1>

              <StockDetailsSection2>
                <StockDetailsBox>
                  <StockDetailsProfile />
                </StockDetailsBox>
              </StockDetailsSection2>
              
            <StockDetailsTabs />

            <TablesActionBtnsContextProvider>
              <Outlet context={{}}/>
            </TablesActionBtnsContextProvider>
            </>
          }
        </>
      }
    </>
  )
}
export default StockDetailsLayout;


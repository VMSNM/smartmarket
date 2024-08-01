import * as React from 'react';
import {useState, useEffect} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TabsFullWidthContainer } from '../../../styles/main';
import { TabsFullWidthOption } from '../../../styles/stockdetails-layout/tabs';
import './StockDetailsTabs.css';
import { Colors } from '../../../styles/theme';

export default function StockDetailsTabs() {
  const { ticker } = useParams();

  const navigate = useNavigate();
  const location = useLocation();
  const tabTarget = location.pathname.toString().split('/').pop();

  const [tabOption, setTabOption] = useState(tabTarget || 'overview');
  const handleTabOption = (e) => {
    const { name } = e.target;
    setTabOption(name);
    navigate(`/stockDetails/${ticker}/${name}`);
  }

  useEffect(() => {
    if (tabTarget === 'overview' || tabTarget === 'valuation' || tabTarget === 'news') {
      setTabOption(tabTarget);
      return;
    }
    setTabOption('financials');
  }, [tabTarget]);

  return (
    <>
    <TabsFullWidthContainer mb={4}>
        <TabsFullWidthOption 
          name='overview' 
          className={tabOption === 'overview' ? 'tab-active' : ''} 
          onClick={handleTabOption} 
          sx={{borderTopLeftRadius:'10px'}}
        >
          Overview
        </TabsFullWidthOption>
        
        <TabsFullWidthOption 
          name='financials' 
          className={tabOption === 'financials' ? 'tab-active' : ''} 
          onClick={handleTabOption}
        >
          Financial Statements
        </TabsFullWidthOption>
        
        <TabsFullWidthOption 
          name='valuation' 
          className={tabOption === 'valuation' ? 'tab-active' : ''} 
          onClick={handleTabOption}
        >
          Valuation
        </TabsFullWidthOption>
        
        <TabsFullWidthOption 
          name='news' 
          className={tabOption === 'news' ? 'tab-active' : ''} 
          onClick={handleTabOption} 
          sx={{borderRight:`1px solid ${Colors.primary}`, borderTopRightRadius:'10px'}}
        >
          Latest news
        </TabsFullWidthOption>
    </TabsFullWidthContainer>
    </>
  );
}
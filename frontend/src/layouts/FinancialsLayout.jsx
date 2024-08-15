import { Outlet, useLocation } from 'react-router-dom';
import { TitleText } from '../styles/main';
import { Divider } from '@mui/material'
import { useEffect, useState } from 'react';
import FinancialsTabs from '../components/financials-layout/FinancialsTabs';

const FinancialsLayout = () => {
  const location = useLocation();
  const tabTarget = location.pathname.toString().split('/').pop();

  const [tabOption, setTabOption] = useState(tabTarget || 'incomeStatement');

  useEffect(() => {
    setTabOption(tabTarget);
  }, [tabTarget]);

  return (
    <>
      <TitleText variant='h3'>Financial Statements</TitleText>
      <Divider sx={{marginTop:'10px', marginBottom:'30px'}} />
      <FinancialsTabs tabOption={tabOption} setTabOption={setTabOption} />

      <Outlet context={{}}/>
    </>
  )
}

export default FinancialsLayout;
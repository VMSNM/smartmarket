import { Divider } from '@mui/material'
import { useState } from 'react';
import ValuationTabs from '../../components/valuation/ValuationTabs';
import { TitleText } from '../../styles/main';
import DCF from '../../components/valuation/dcf/DCF';
import NCAV from '../../components/valuation/ncav/NCAV';

const Valuation = () => {
  const [tabOption, setTabOption] = useState('dcf');

  return (
    <>
      <TitleText variant='h3'>Valuation</TitleText>
      <Divider sx={{marginTop:'10px', marginBottom:'30px'}} />
      <ValuationTabs tabOption={tabOption} setTabOption={setTabOption} />
      { tabOption === 'dcf' && <DCF /> }
      { tabOption === 'ncav' && <NCAV /> }
    </>
  )
}

export default Valuation;
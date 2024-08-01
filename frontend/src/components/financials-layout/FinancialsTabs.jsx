import React, { useEffect } from 'react'
import { SubTabBtn, SubTabsContainer } from '../../styles/main'
import { useNavigate, useParams } from 'react-router-dom'

const FinancialsTabs = ({tabOption, setTabOption}) => {
    const {ticker} = useParams();
    const navigate = useNavigate();

    const handleTabOption = (e) => {
        const { name } = e.target;
        setTabOption(name);
        navigate(`/stockDetails/${ticker}/financials/${name}`);
    }

    useEffect(() => {
        setTabOption('incomeStatement');
        navigate(`/stockDetails/${ticker}/financials/incomeStatement`)
      }, []);

    return (
        <SubTabsContainer>
            <SubTabBtn size={'180px'} name='incomeStatement' onClick={handleTabOption} className={tabOption === 'incomeStatement' ? 'subtab-active' : ''}>
            Income Statement
            </SubTabBtn>

            <SubTabBtn size={'180px'} name='balanceSheet' onClick={handleTabOption} className={tabOption === 'balanceSheet' ? 'subtab-active' : ''}>
            Balance Sheet
            </SubTabBtn>
            
            <SubTabBtn size={'180px'} name='cashFlowStatement' onClick={handleTabOption} className={tabOption === 'cashFlowStatement' ? 'subtab-active' : ''}>
            Cashflow Statement
            </SubTabBtn>
        </SubTabsContainer>
    )
}

export default FinancialsTabs;
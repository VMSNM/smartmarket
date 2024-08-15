import React, { useEffect } from 'react'
import { SubTabBtn, SubTabsContainer } from '../../styles/main'

const ValuationTabs = ({tabOption, setTabOption}) => {
    const handleTabOption = (e) => {
        const { name } = e.target;
        setTabOption(name);
    }

    return (
        <SubTabsContainer>
            <SubTabBtn size={'120px'} name='dcf' onClick={handleTabOption} className={tabOption === 'dcf' ? 'subtab-active' : ''}>
            DCF
            </SubTabBtn>

            <SubTabBtn size={'120px'} name='ncav' onClick={handleTabOption} className={tabOption === 'ncav' ? 'subtab-active' : ''}>
            NCAV
            </SubTabBtn>
        </SubTabsContainer>
    )
}

export default ValuationTabs;
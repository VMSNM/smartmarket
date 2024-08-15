import React, { useEffect } from 'react'
import { BodyText } from '../../styles/main'
import { Stack } from '@mui/material';
import { useCommonModalContext } from '../../context/CommonModalContext';
import { Colors } from '../../styles/theme';
import { avaiableTickers } from '../../../../frontend/src/utils/portfolios';
import TickersAvaiable from './TickersAvaiableTable';
import UpgradeAccount from '../common/UpgradeAccount';

const DemoLocalAccount = () => {
    const { value: {setCommonModalOpen, setCommonModalContent}} = useCommonModalContext();

    const tickers = avaiableTickers;

    const handleOpenTickerAvaiable = () => {
        setCommonModalContent(<TickersAvaiable />);
        setCommonModalOpen(true);
    }

    return (
        <>
            <BodyText variant='body1' mb={1} mt={2}>
                This is a demo account and you are limited to 8 companies made avaiable.
            </BodyText>
            <BodyText variant='body1' mb={2} mt={1}>
                The data showed and used for calculations is static, real data, representing the period of 5 years between August of 2019 and August of 2024.
            </BodyText>
            

            { tickers?.length > 0 && (
                <BodyText 
                    variant='body1' 
                    wantedColor={Colors.primary} 
                    sx={StyledLinkText}
                    onClick={handleOpenTickerAvaiable}
                >
                    View Companies
                </BodyText>
            )}
            <UpgradeAccount />
        </>
    )
}

export default DemoLocalAccount;

const StyledLinkText = {
    width:'auto', 
    cursor:'pointer', 
    transition: '.7s all', 
    ':hover': {
        color:Colors.secondary
    }
}
import React from 'react'
import CurrentPrice from './CurrentPrice';
import { Stack, styled } from '@mui/material';
import CalculateDCFBtn from './CalculateDCFBtn';
import { Colors } from '../../../../../styles/theme';

const AssumptionsCalculation = () => {

    const CalculateBox = styled(Stack, {
        shouldForwardProp: (props) => props !== 'wantedColor'
    })(({ theme, wantedColor }) => ({
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        alignItems: 'center',
        background: theme.palette.mode === 'light' ? Colors.secondaryBG : Colors.secondaryBGdark,
        padding: '10px 20px',
        borderRadius: '5px'
    }));

    return (
        <>
        <CalculateBox mt={4}>
            <CurrentPrice />
            <CalculateDCFBtn />
        </CalculateBox>
        </>
    )
}

export default AssumptionsCalculation;
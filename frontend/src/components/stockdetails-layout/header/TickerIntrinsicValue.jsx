import { Button, CircularProgress, Stack } from '@mui/material'
import React, { useState } from 'react'
import { BodyTextTitle, CaptionText, LoadingBox } from '../../../styles/main'
import { Colors } from '../../../styles/theme'
import { USDollar2Dig } from '../../../utils/useful'
import useGetIntrinsicValue from '../../../hooks/dcf/useGetIntrinsicValue'
import toast from 'react-hot-toast'

const TickerIntrinsicValue = () => {
    const { loadingIV, getIntrinsicValue } = useGetIntrinsicValue();
    const [intrinsicValue, setIntrinsicValue] = useState(null);

    const showIntrinsicValue = () => {
        const intrinsicValue = getIntrinsicValue();
        setIntrinsicValue(intrinsicValue);
        displayToast();
    }

    return (
        <>
        { loadingIV && (
            <LoadingBox sx={{width: '100%', height: '40px', display:'flex', justifyContent:'center'}}>
              <CircularProgress /> 
            </LoadingBox>
        )}
        { !loadingIV && (
        <Stack justifyContent={'right'}>
            <CaptionText variant='caption' textAlign={'right'}>Intrinsic Value</CaptionText>
            { intrinsicValue && (
                <BodyTextTitle 
                    variant='subtitle1' 
                    wantedColor={Colors.secondary} 
                    textAlign={'right'}
                    sx={{cursor:'pointer'}}
                    onClick={displayToast}
                >
                        {USDollar2Dig.format(intrinsicValue)}
                </BodyTextTitle>
            )}
            { !intrinsicValue && (
                <Button
                onClick={showIntrinsicValue}
                sx={{textTransform:'capitalize', fontSize: '.7rem', background: Colors.secondary, color: Colors.white, height: '25px', transition: '1s', position: 'inherit' }}
                >
                Check DCF
                </Button>
            )}
        </Stack>
        )}
        </>
    )
}

export default TickerIntrinsicValue;

const displayToast = () => {
    toast('Intrinsic value is calculated using certain growth and margins assumptions. Please make your own assumptions and calculate what is your fair value.', { duration: 6000, icon: '⚠️' });
}
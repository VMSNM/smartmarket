import React from 'react'
import { BodyText, BodyTextTitle, LoadingBox, SubtitleText } from '../../../styles/main'
import { Colors } from '../../../styles/theme'
import { CircularProgress, Stack } from '@mui/material';
import { ProfileBox } from '../../../styles/stockdetails-layout/profile';
import { useStockDetailsContext } from '../../../context/StockDetailsContext';
import ProfileAnnualReports from './ProfileAnnualReports';

const StockDetailsProfile = () => {
    const { value: { stockDetails: { keyMetrics }}} = useStockDetailsContext();

    return (
    <>
        { !keyMetrics && (
            <LoadingBox sx={{width: '100%', display:'flex', justifyContent:'center'}}>
              <CircularProgress /> 
            </LoadingBox>
        )}
        { keyMetrics && (
        <>
            <ProfileBox display={'grid'} gridTemplateColumns={'3fr 1fr'} gap={2}>
                <Stack gap={2}>
                    <SubtitleText variant='subtitle1'>
                        Company name: <span style={{color:Colors.secondary}}>{keyMetrics?.Name}</span>
                    </SubtitleText>

                    <Stack>
                        <BodyTextTitle variant='subtitle1'>Description</BodyTextTitle>
                        <BodyText variant='body1'>{keyMetrics?.Description}</BodyText>
                    </Stack>

                    <Stack>
                        <BodyTextTitle variant='subtitle1'>Annual Reports</BodyTextTitle>
                        <ProfileAnnualReports />
                    </Stack>
                </Stack>

                <Stack gap={2}>
                    <Stack>
                        <BodyTextTitle variant='subtitle1'>Sector</BodyTextTitle>
                        <BodyText variant='body1'>{keyMetrics?.Sector}</BodyText>
                    </Stack>
                    <Stack>
                        <BodyTextTitle variant='subtitle1'>Industry</BodyTextTitle>
                        <BodyText variant='body1'>{keyMetrics?.Industry}</BodyText>
                    </Stack>
                    <Stack>
                        <BodyTextTitle variant='subtitle1'>County</BodyTextTitle>
                        <BodyText variant='body1'>{keyMetrics.Country}</BodyText>
                    </Stack>
                    <Stack>
                        <BodyTextTitle variant='subtitle1'>Address</BodyTextTitle>
                        <BodyText variant='body1'>{keyMetrics?.Address}</BodyText>
                    </Stack>
                </Stack>
            </ProfileBox>
        </> 
        )}
    </>
    )
}

export default StockDetailsProfile
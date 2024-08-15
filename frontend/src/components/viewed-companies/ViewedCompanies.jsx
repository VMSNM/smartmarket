import React, { useEffect } from 'react'
import { BodyText, LoadingBox } from '../../styles/main'
import useGetViewedByUser from '../../hooks/viewed-companies/useGetViewedByUser';
import { useAuthContext } from '../../context/AuthContext';
import { CircularProgress, Stack } from '@mui/material';
import { useViewedContext } from '../../context/ViewedContext';
import ViewedCompaniesTable from './viewed-modal/ViewedCompaniesTable';
import SpotsLeftCount from './SpotsLeftCount';
import { useCommonModalContext } from '../../context/CommonModalContext';
import { Colors } from '../../styles/theme';
import UpgradeAccount from '../common/UpgradeAccount';

const ViewedCompanies = ({viewedLoaded = false}) => {
    const { authUser } = useAuthContext();
    const { viewedByUser, setViewedByUser, viewedLimit: {numberOfTickers, numberOfDays}} = useViewedContext();
    const { value: {setCommonModalOpen, setCommonModalContent}} = useCommonModalContext();
    const { loadingViewed, getViewedByUser } = useGetViewedByUser();

    const handleGetViewed = async () => {
        const data = await getViewedByUser(authUser?._id);
        if (data) {
            localStorage.setItem('viewed-companies', JSON.stringify(data));
            setViewedByUser(data);
        }
    }

    useEffect(() => {
        if (authUser?.role === 'guest' && !viewedLoaded) handleGetViewed();
    }, []);

    const handleOpenViewedCompanies = () => {
        setCommonModalContent(<ViewedCompaniesTable />);
        setCommonModalOpen(true);
    }

    return (
        <>
            <BodyText variant='body1' mb={2} mt={2}>
                This is a guest account and you are limited to {numberOfTickers} companies every {numberOfDays} days.
            </BodyText>
            
            { loadingViewed && (
                <LoadingBox><CircularProgress /></LoadingBox>
            )}
            
            { !loadingViewed && (
                <>
                <Stack direction={'column'} gap={.7} mb={2}>

                    <SpotsLeftCount />
                    
                    { viewedByUser?.length > 0 && (
                        <BodyText 
                            variant='body1' 
                            wantedColor={Colors.primary} 
                            sx={StyledLinkText}
                            onClick={handleOpenViewedCompanies}
                        >
                            View Companies
                        </BodyText>
                    )}
                </Stack>
                </>
            )}
            <UpgradeAccount />
        </>
    )
}

export default ViewedCompanies;

const StyledLinkText = {
    width:'auto', 
    cursor:'pointer', 
    transition: '.7s all', 
    ':hover': {
        color:Colors.secondary
    }
}
import { Box, Divider, Menu, MenuItem, Stack } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuthContext } from '../../../../context/AuthContext';
import useLogout from '../../../../hooks/auth/useLogout';
import { useCommonModalContext } from '../../../../context/CommonModalContext';
import ViewedCompaniesTable from '../../../viewed-companies/viewed-modal/ViewedCompaniesTable';
import SpotsLeftCount from '../../../viewed-companies/SpotsLeftCount';
import TickersAvaiable from '../../../demo-local-account/TickersAvaiableTable';
import { BodyText } from '../../../../styles/main';

const AccountButton = () => {
    const { authUser } = useAuthContext();
    const { value: {setCommonModalOpen, setCommonModalContent}} = useCommonModalContext();
    const { logout } = useLogout();

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleOpenViewedCompanies = () => {
        setCommonModalContent(<ViewedCompaniesTable />);
        setCommonModalOpen(true);
    }

    const handleOpenTickerAvaiable = () => {
        setCommonModalContent(<TickersAvaiable />);
        setCommonModalOpen(true);
    }

    const handleLogout = async () => {
        setAnchorEl(null);
        await logout();
        navigate('/');
    }

    return (
        <>
        <AccountCircleIcon 
            sx={{width:'30px', height:'30px', cursor:'pointer'}}
            onClick={(e) => {e.preventDefault(); setAnchorEl(e.currentTarget)}} 
        /> 

        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{'aria-labelledby': 'basic-button'}} 
            sx={{ marginTop:'15px'}}
        >
            { authUser?.role === 'guest' && (
                <Stack>
                    <Box p={2} width={'250px'}>
                        <SpotsLeftCount />
                    </Box>
                    <MenuItem onClick={() => { setAnchorEl(null); handleOpenViewedCompanies(); }}>View Companies</MenuItem>
                </Stack>
            )}

            { authUser?.role === 'local' && (
                <Stack>
                    <Box p={2} width={'250px'}>
                        <BodyText variant='body1'>
                            This is a demo account and you are limited to 10 companies made avaiable
                        </BodyText>
                    </Box>
                    <MenuItem onClick={() => { setAnchorEl(null); handleOpenTickerAvaiable(); }}>View Companies</MenuItem>
                </Stack>
            )}
            
            <MenuItem disabled={authUser?.role !== 'admin'} onClick={() => { setAnchorEl(null); }}>My Account</MenuItem>
            <MenuItem disabled={authUser?.role !== 'admin'} onClick={() => { setAnchorEl(null); }}>Update Profile</MenuItem>
            <Divider variant='middle' />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
        </>
    )
}

export default AccountButton;
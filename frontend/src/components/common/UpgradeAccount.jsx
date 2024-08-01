import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { BodyText } from '../../styles/main';
import { Stack } from '@mui/material';

const UpgradeAccount = () => {
    const { authUser } = useAuthContext();

    return (
        <>
        <Stack>
            { authUser.role === 'local' && (
                <BodyText variant='caption' mt={4}>
                    If you want to get real time data and no tickers limitations, you need to upgrade your account to a guest account (limited to 3 tickers every 7 days) or a no limit account.
                </BodyText>
            )}

            { authUser.role === 'guest' && (
                <BodyText variant='caption' mt={4}>
                    To be able to check an unlimited number of tickers, you need to upgrade your account to a no limit account.
                </BodyText>
            )}

            <BodyText variant='caption' sx={{fontWeight:'bold !important'}}>
                Please check our contacts in the footer and send us a message.
            </BodyText>
        </Stack>
        </>
    )
}

export default UpgradeAccount
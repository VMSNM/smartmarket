import { Box, styled } from "@mui/material";

export const ProfileBox = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '3fr 1fr',
    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
    }
}));
import { Stack, styled } from "@mui/material";

export const TickerPriceStack = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    gap:'10px',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        gap:'0px',
        alignItems: 'flex-start',
    }
}))
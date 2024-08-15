import { Box, styled } from "@mui/material";
import { Colors } from "../theme";

export const StockDetailsSection1 = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '3fr 2fr',
    gap: '20px',
    marginTop: '20px',
    marginBottom: '30px',
    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
    }
}));

export const StockDetailsSection2 = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    marginTop: '20px',
    marginBottom: '30px',
}));

export const StockDetailsBox = styled(Box)(({ theme }) => ({
    background: theme.palette.mode === 'light' ? Colors.secondaryBG : Colors.secondaryBGdark,
    borderRadius: '0px',
    border: `1px solid ${Colors.border}`,
    padding: '20px',
    borderRadius: '10px'
    /* boxShadow: '0px 0px 5px #555' */
}));

export const FinancialsFullChartBox = styled(Box)(({ theme }) => ({
    background: theme.palette.mode === 'light' ? Colors.secondaryBG : Colors.secondaryBGdark,
    borderRadius: '0px',
    border: `1px solid ${Colors.border}`,
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '900px', 
    margin: '0 auto', 
    marginTop: '30px', 
    marginBottom: '30px'
    /* boxShadow: '0px 0px 5px #555' */
}));

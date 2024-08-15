import { Box, Stack, TableCell, TableContainer, TextField, styled, tableCellClasses } from "@mui/material";
import { Colors } from "../theme";

export const DCFTableCell = styled(TableCell, {
    shouldForwardProp: (props) => (props !== 'bgColor' && props !== 'txtColor')
    })(({ theme, bgColor, txtColor }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: bgColor || Colors.table_dcf_header,
            color: txtColor || Colors.white,
            fontWeight: 'bold',
            textShadow: `1px 1px 2px ${Colors.black}`,
            fontSize: '.8rem',
            borderBottom: 'none'
        },
        [`&.${tableCellClasses.body}`]: {
            backgroundColor: bgColor || 'inherit',
            color: txtColor || 'inherit',
            /* textShadow: theme.palette.mode === 'light' ? '' : `1px 1px 2px ${Colors.black}`, */
            fontSize: '.8rem',
        },
        fontWeight: '500',
    }
));

export const DCFCalculationsBox = styled(Box, {
    shouldForwardProp: (props) => (props !== 'bgColor' && props !== 'txtColor')
    })(({ theme, bgColor, txtColor }) => ({
        width:'70%',
        display: 'flex',
        marginLeft:'30%',
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginLeft:'0',
        }
    }
));

export const AssumptionsHeaderContainer = styled(Stack)(({ theme }) => ({
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginBottom:'10px',
    marginTop:'10px',
    flexWrap:'wrap'
    /* [theme.breakpoints.down('sm')]: {
        flexDirection:'column',
        alignItems:'flex-start'
    } */
}));

export const MetricSelectionContainer = styled(Stack)(({ theme }) => ({
    flexDirection:'row',
    gap:'10px',
    justifyContent:"flex-start",
    alignItems:'center',
    flexWrap:'wrap'
}));
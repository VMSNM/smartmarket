import { Button, styled } from "@mui/material";
import { Colors } from "../theme";

export const PriceActionChartButton = styled(Button)(({ theme }) => ({
    position: 'inherit',
    textTransform: 'capitalize',
    height: '30px',
    fontSize: '14px',
    /* transition: '.5s ease-in-out', */
    ':hover': { background: Colors.primary, color: Colors.white }
}));
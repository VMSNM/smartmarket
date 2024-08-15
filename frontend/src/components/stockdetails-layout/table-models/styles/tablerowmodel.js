import { TableCell, styled, tableCellClasses } from "@mui/material";
import { Colors } from "../../../../styles/theme";

export const RatedTableCell = styled(TableCell, {
    shouldForwardProp: (props) => props !== 'coloredData' && props !== 'rateValueAboveBellow' && props !== 'rateValuesMinAvgMax' && props !== 'metric'
})(({ theme, metric, coloredData = null, rateValueAboveBellow, rateValuesMinAvgMax }) => ({
    fontSize: '.8rem',
    fontWeight: '500',
    color: !coloredData ? ''

            : (rateValueAboveBellow !== null && coloredData === 'positive' && metric >= rateValueAboveBellow) || (rateValueAboveBellow !== null && coloredData === 'negative' && metric <= rateValueAboveBellow) 
            ? Colors.success

            : (rateValueAboveBellow !== null && coloredData === 'positive' && metric < rateValueAboveBellow) || (rateValueAboveBellow !== null && coloredData === 'negative' && metric > rateValueAboveBellow) 
            ? Colors.danger

            : (rateValuesMinAvgMax && coloredData === 'positive' && metric >= rateValuesMinAvgMax?.max) || (rateValuesMinAvgMax && coloredData === 'negative' && metric <= rateValuesMinAvgMax?.min)
            ? Colors.success

            : ((coloredData === 'positive' && metric >= rateValuesMinAvgMax?.avg) || (coloredData === 'negative' && metric <= rateValuesMinAvgMax?.avg))
            ? Colors.warning

            : Colors.danger,
    /* textShadow: theme.palette.mode === 'light' ? '' : `1px 1px 2px ${Colors.black}`, */
}))
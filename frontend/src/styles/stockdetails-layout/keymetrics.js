import { Box, Stack, styled } from "@mui/material";
import { Colors } from "../theme";

export const KeyMetricsBox = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr'
}));

export const KeyMetricField = styled(Stack, {
    shouldForwardProp: (props) => (props !== 'rowIdx') && (props !== 'withBorder')
})(({ theme, rowIdx, withBorder }) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '10px 15px',
    borderRight: withBorder ? `1px solid ${Colors.border}` : 'none',
    background: (rowIdx === '1' && theme.palette.mode === 'light') ? Colors.primaryBG 
                : (rowIdx === '1' && theme.palette.mode === 'dark') ? Colors.primaryBGdark
                : (rowIdx === '2' && theme.palette.mode === 'light') ? Colors.secondaryBG
                : Colors.secondaryBGdark
}));

export const KeyMetricsPriceRangeBox = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 3fr',
    gap: '15px'
}));
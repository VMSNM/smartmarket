import { Box, styled } from "@mui/material";

export const ModalChartContainer = styled(Box, {
    shouldForwardProp: (props) => props !== 'rowIdx'
})(({ theme, rowIdx }) => ({
    width: '85vw',
    maxWidth: '900px',
}));
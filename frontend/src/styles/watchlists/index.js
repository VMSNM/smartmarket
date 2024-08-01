import { Box, Stack, styled } from "@mui/material";
import { Colors } from "../theme";

export const CommonModalContainer = styled(Box, {
    shouldForwardProp: (props) => (props !== 'rowIdx')
})(({ theme, rowIdx }) => ({
    position: 'absolute',
    zIndex:999,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    /* minWidth: '350px',
    maxWidth: '450px', */
    width:'auto',
    backgroundColor: theme.palette.mode === 'dark' ? Colors.secondaryBGdark : Colors.secondaryBG,
    boxShadow: '1px 1px 1px black',
    padding: '30px',
    borderRadius: '10px',
    border: 'none !important',
    ':focus': {
        border: 'none !important'
    }
}));

export const CreateNewWatchlistSection = styled(Stack)(({ theme }) => ({
    margin: '10px',
    padding: '15px 10px',
    marginTop: '20px',
    minWidth: '300px',
    maxWidth: '450px',
    borderRadius: '5px',
    gap: '10px',
    background: theme.palette.mode === 'dark' ? Colors.secondaryBGdark : Colors.secondaryBG
}));


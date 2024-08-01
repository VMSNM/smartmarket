import { Stack, styled } from "@mui/material";

export const ModalBoxSmall = styled(Stack)(({ theme }) => ({
    padding:'0px',
    marginBottom:'10px',
    gap: '20px',
    width: '350px',
    [theme.breakpoints.down('sm')]: {
        width: '80vw',
        padding:'0px'
    }
}));

export const ModalBoxLarge = styled(Stack)(({ theme }) => ({
    padding:'0px',
    marginBottom:'10px',
    gap: '20px',
    width: '450px',
    [theme.breakpoints.down('sm')]: {
        width: '80vw',
        padding:'0px'
    }
}));

export const ModalConfirmationQuestion = styled(Stack)(({ theme }) => ({
    marginTop: '20px',
    justifyContent:'flex-start',
    width: '350px',
    [theme.breakpoints.down('sm')]: {
        width: '80vw',
        padding:'0px'
    }
}));
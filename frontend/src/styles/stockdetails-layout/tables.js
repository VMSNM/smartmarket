import { Stack, styled } from "@mui/material";

export const TablesActionBtnsContainer = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap:'wrap',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px'
}));
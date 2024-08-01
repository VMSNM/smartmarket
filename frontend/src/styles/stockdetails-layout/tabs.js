import { Button, styled } from "@mui/material";
import { Colors } from "../theme";

export const TabsFullWidthOption = styled(Button)(({ theme }) => ({
    position:'inherit',
    width:'200px',
    minWidth:'200px',
    flexGrow:'1',
    textTransform: 'capitalize',
    height: '40px',
    fontSize: '16px',
    border:`1px solid ${Colors.primary}`,
    borderBottom:'none',
    color: 'inherit',
    borderRight: 0,
    borderRadius:0,
    overflow:'hidden',
    background: theme.palette.mode === 'light' ? Colors.secondaryBG : Colors.secondaryBGdark,
    transition: '.5s ease-in-out',
    ':hover': { color: Colors.primary, borderBottom:0 }
}));
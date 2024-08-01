import { IconButton, Stack } from "@mui/material";
import { MainAppbarContainer } from "../../../styles/root-layout/mainappbar";
import AccountButton from "./account-btn/AccountButton";
import SearchBoxStocks from "./search/SearchBoxStocks";
import DrawerButton from "./drawer-btn/DrawerButton";
import AppNameLogo from "./appNameLogo/AppNameLogo";

const MainAppbar = () => {
  return (
    <MainAppbarContainer>
      <Stack direction={'row'} gap={0} alignItems={'center'}>
        <DrawerButton />
        <AppNameLogo />
      </Stack>

      <SearchBoxStocks />

      <IconButton>
        <AccountButton />
      </IconButton>
      
    </MainAppbarContainer>
  )
}

export default MainAppbar;
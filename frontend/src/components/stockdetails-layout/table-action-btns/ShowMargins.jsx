import { Box, Switch } from "@mui/material";
import { BodyText } from "../../../styles/main";
import { useTablesActionBtnsContext } from "../../../context/TablesActionBtnsContext";

const ShowMargins = ({reversed, setReversed}) => {
    const { showMargins, setShowMargins } = useTablesActionBtnsContext();
    const handleShowMargins = () => {
        if (reversed) setReversed(false);
        setShowMargins(!showMargins);
    }
    return (

        <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
            <BodyText variant='body2' onClick={handleShowMargins}>Show margins</BodyText>
            <Switch 
                checked={showMargins} 
                size="small"
                onChange={handleShowMargins} 
                inputProps={{ 'aria-label': 'controlled' }}
            />
        </Box>
    )
}

export default ShowMargins;
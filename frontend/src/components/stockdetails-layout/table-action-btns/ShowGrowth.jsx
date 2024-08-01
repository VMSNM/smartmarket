import { Box, Switch } from "@mui/material";
import { BodyText } from "../../../styles/main";
import { useTablesActionBtnsContext } from "../../../context/TablesActionBtnsContext";

const ShowGrowth = ({reversed, setReversed}) => {
    const { showGrowth, setShowGrowth } = useTablesActionBtnsContext();
    const handleShowGrowth = () => {
        if (reversed) setReversed(false);
        setShowGrowth(!showGrowth);
    }
    return (

        <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
            <BodyText variant='body2' onClick={handleShowGrowth}>Show growth</BodyText>
            <Switch 
                checked={showGrowth} 
                size="small"
                onChange={handleShowGrowth} 
                inputProps={{ 'aria-label': 'controlled' }}
            />
        </Box>
    )
}

export default ShowGrowth;
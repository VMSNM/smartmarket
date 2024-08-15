import { Box, Switch } from "@mui/material";
import { BodyText } from "../../../../../styles/main";
import { useDCFContext } from "../../../../../context/DCFContext";
import { useStockDetailsContext } from "../../../../../context/StockDetailsContext";

const AutofillBtn = () => {
    const { value: { assumptionsSetup, setAssumptionsSetup, resetAssumptionsSetup, resetDCFIV, autoFill, setAutoFill }} = useDCFContext();
    
    const { value: { baseDCFSetup }} = useStockDetailsContext();

    const handleAutofill = () => {
        if (autoFill) {
            resetAssumptionsSetup();
            resetDCFIV();
        }
        else setAssumptionsSetup({...baseDCFSetup})
        setAutoFill(!autoFill);
    }
  
    return (
        <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
            <BodyText variant='body2' onClick={handleAutofill}>Autofill</BodyText>
            <Switch 
                checked={autoFill} 
                size='small'
                onChange={handleAutofill} 
                inputProps={{ 'aria-label': 'controlled' }}
            />
        </Box>
    )
}

export default AutofillBtn;
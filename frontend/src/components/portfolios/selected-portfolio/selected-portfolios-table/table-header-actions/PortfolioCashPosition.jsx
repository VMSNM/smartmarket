import { CircularProgress, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BodyText, FormInputText, FormPrimaryActionBtn } from '../../../../../styles/main';
import SaveIcon from '@mui/icons-material/Save';
import useGetPortfoliosFromUser from '../../../../../hooks/portfolios/useGetPorfoliosFromUser';
import { usePortfoliosContext } from '../../../../../context/PortfoliosContext';
import useUpdatePortfolio from '../../../../../hooks/portfolios/useUpdatePortfolio';
import { useCommonModalContext } from '../../../../../context/CommonModalContext';

const PortfolioCashPosition = ({portfolio}) => {

    const { value: {portfolioSelected, setPortfolios}} = usePortfoliosContext();
    const { value: { resetModalContent }} = useCommonModalContext();

    const { loadingUpdatePortfolio, updatePortfolio } = useUpdatePortfolio();
    const { getPortfoliosFromUser } = useGetPortfoliosFromUser();

    const [cashPosition, setCashPosition] = useState(portfolio?.cashPosition);

    const handleCashPosition = (e) => {
        e.preventDefault();
        setCashPosition(e.target.value);
    };

    const handleUpdatePortfolio = async () => {
        await updatePortfolio(portfolioSelected, portfolio?.name, portfolio?.description, cashPosition);
        resetModalContent();
        const data = await getPortfoliosFromUser();
        if (data) {
            setPortfolios(data);
        }
    }

    useEffect(() => {
        setCashPosition(portfolio?.cashPosition);
    }, [portfolio]);

    return (
        <Stack direction={'row'} alignItems={'center'} gap={1}>
            <BodyText variant='caption'>$</BodyText>
            <FormInputText 
                type="number" label="Cash position" name="cashPosition" value={cashPosition} size='small'
                onChange={handleCashPosition} 
                sx={{width:`120px !important`}} inputProps={{min: 0, style: { textAlign: 'right' }}}
            />

            <FormPrimaryActionBtn
                disabled={loadingUpdatePortfolio}
                title={'Update Cash Position'} 
                variant="outlined" 
                startIcon={<SaveIcon />}
                onClick={handleUpdatePortfolio}
            >
                {loadingUpdatePortfolio ? <CircularProgress size="1.5rem" /> : <BodyText variant='body2'>Update</BodyText> }
            </FormPrimaryActionBtn>
        </Stack>
    )
}

export default PortfolioCashPosition
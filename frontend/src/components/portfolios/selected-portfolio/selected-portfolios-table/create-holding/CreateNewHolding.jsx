import React, { useEffect, useState } from 'react'
import { Divider, Stack } from '@mui/material';
import { BodyTextTitle } from '../../../../../styles/main';
import CommonFieldInputs from '../common-fields-inputs/CommonFieldsInputs';
import ActionBtn from './ActionBtn';
import { usePortfoliosContext } from '../../../../../context/PortfoliosContext';
import { useCommonModalContext } from '../../../../../context/CommonModalContext';
import useAddRemoveFromPortfolio from '../../../../../hooks/portfolios/useAddRemoveFromPortfolios';
import useGetPortfoliosFromUser from '../../../../../hooks/portfolios/useGetPorfoliosFromUser';
import { ModalBoxSmall } from '../../../../../styles/modal';

const CreateNewHolding = () => {

    const { value: {portfolioSelected, setPortfolios}} = usePortfoliosContext();
    const { value: { resetModalContent }} = useCommonModalContext();

    const { loadingAddRemove, addRemoveFromPortfolio } = useAddRemoveFromPortfolio();
    const { getPortfoliosFromUser } = useGetPortfoliosFromUser();

    const [inputs, setInputs] = useState({
        tickerSymbol: '',
        sharesCount: 1,
        avgBuyPrice: 1
    })

    const handleAddRemoveFromPortfolio = async () => {
        await addRemoveFromPortfolio(portfolioSelected, inputs?.tickerSymbol, inputs?.sharesCount, inputs?.avgBuyPrice);
        resetModalContent();

        const data = await getPortfoliosFromUser();
        if (data) setPortfolios(data);
    }

    return (
        <>
        <ModalBoxSmall>
            <Stack mb={1}>
                <BodyTextTitle variant='subtitle1'>Add New Position</BodyTextTitle>
                <Divider />
            </Stack>
            
            <CommonFieldInputs inputs={inputs} setInputs={setInputs} />

            <ActionBtn inputs={inputs} setInputs={setInputs} handleAddRemoveFromPortfolio={handleAddRemoveFromPortfolio} loadingAddRemove={loadingAddRemove} />
        </ModalBoxSmall>
        </>
    )
}

export default CreateNewHolding;


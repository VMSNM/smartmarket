import React from 'react'
import { usePortfoliosContext } from '../../../../context/PortfoliosContext';
import { useCommonModalContext } from '../../../../context/CommonModalContext';
import useAddRemoveFromPortfolio from '../../../../hooks/portfolios/useAddRemoveFromPortfolios';
import useGetPortfoliosFromUser from '../../../../hooks/portfolios/useGetPorfoliosFromUser';
import ConfirmationQuestion from '../../../../layouts/common/confirmation-question/ConfirmationQuestion';

const DeleteHoldingFromPortfolio = ({tickerSymbol}) => {

    const { value: {portfolioSelected, setPortfolios, setPortfolioSelected}} = usePortfoliosContext();
    const { value: { resetModalContent }} = useCommonModalContext();

    const { loadingAddRemove, addRemoveFromPortfolio } = useAddRemoveFromPortfolio();
    const { getPortfoliosFromUser } = useGetPortfoliosFromUser();

    const handleAddRemoveFromPortfolio = async () => {
        const dataSelected = await addRemoveFromPortfolio(portfolioSelected, tickerSymbol);
        resetModalContent();
        if (dataSelected) setPortfolioSelected(dataSelected._id);

        const data = await getPortfoliosFromUser();
        if (data) setPortfolios(data);
    }

    return (
    <>
        <ConfirmationQuestion 
            question={`Sure you want to delete ${tickerSymbol}?`}
            alert='danger' 
            extraAlert={'You cannot undo this action'} 
            callbackFn1={handleAddRemoveFromPortfolio} 
            callbackFn2={resetModalContent} 
            loading={loadingAddRemove}
        />
    </>
    )
}

export default DeleteHoldingFromPortfolio
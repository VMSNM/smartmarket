import React from 'react'
import { CircularProgress } from '@mui/material';
import { LoadingBox } from '../../../styles/main';
import { useCommonModalContext } from '../../../context/CommonModalContext';
import { usePortfoliosContext } from '../../../context/PortfoliosContext';
import useDeletePortfolio from '../../../hooks/portfolios/useDeletePortfolio';
import ConfirmationQuestion from '../../../layouts/common/confirmation-question/ConfirmationQuestion';

const PortfoliosDelete = () => {

  const { value: {portfolios, portfolioSelected, setPortfolios, setPortfolioSelected}} = usePortfoliosContext();
  const { value: { resetModalContent }} = useCommonModalContext();
  const { loadingDeletePortfolio, deletePortfolio } = useDeletePortfolio();

  const portfolioName = portfolios?.find(element => element._id === portfolioSelected)

  const handleDeletePortfolio = async () => {
    const data = await deletePortfolio(portfolioSelected);
    resetModalContent();
    if (data) {
        setPortfolios(data);
        setPortfolioSelected(data[0]?._id);
        return;
    }
    setPortfolioSelected('');
  }

  return (
    <>
      <ConfirmationQuestion 
        question={`Sure you want to delete ${portfolioName?.name} portfolio?`} 
        alert='danger' 
        extraAlert={'You cannot undo this action'} 
        callbackFn1={handleDeletePortfolio} 
        callbackFn2={resetModalContent} 
        loading={loadingDeletePortfolio}
      />
    </>
  )
}

export default PortfoliosDelete
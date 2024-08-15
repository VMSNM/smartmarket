import React, { useEffect, useState } from 'react'
import { Divider, Stack } from '@mui/material';
import CommonFieldInputs from '../common-fields-inputs/CommonFieldsInputs';
import ActionBtn from './ActionBtn';
import { BodyTextTitle } from '../../../../../styles/main';
import { usePortfoliosContext } from '../../../../../context/PortfoliosContext';
import useGetPortfoliosFromUser from '../../../../../hooks/portfolios/useGetPorfoliosFromUser';
import useUpdateHoldingData from '../../../../../hooks/portfolios/useUpdateHoldingData';
import { useCommonModalContext } from '../../../../../context/CommonModalContext';
import { ModalBoxLarge } from '../../../../../styles/modal';

const UpdateHoldingFromPortfolio = ({tickerSymbol}) => {

  const { value: {portfolioSelected, portfolios, setPortfolios}} = usePortfoliosContext();
  const { value: { resetModalContent }} = useCommonModalContext();

  const { loadingUpdateHoldingData, updateHoldingData } = useUpdateHoldingData();
  const { getPortfoliosFromUser } = useGetPortfoliosFromUser();

  const [inputs, setInputs] = useState({  
    sharesCount: 1,
    avgBuyPrice: 1,
    notes: '',
  });

  const handleUpdateHoldingData = async () => {
    await updateHoldingData(portfolioSelected, tickerSymbol, inputs?.sharesCount, inputs?.avgBuyPrice, inputs?.notes);
    const data = await getPortfoliosFromUser();
    if (data) {
        setPortfolios(data);
    }
    resetModalContent();
  }

  useEffect(() => {
    let holdingData = portfolios?.find(element => element._id === portfolioSelected)?.tickers?.find(ticker => ticker.symbol === tickerSymbol);
    setInputs({
      sharesCount: holdingData.sharesCount,
      avgBuyPrice: holdingData.avgBuyPrice,
      notes: holdingData.notes
    })
  }, [portfolioSelected]);

  return (
    <>
      <ModalBoxLarge>
        <Stack mb={1}>
            <BodyTextTitle variant='subtitle1'>Update {tickerSymbol} Holding</BodyTextTitle>
            <Divider />
        </Stack>
        
        <CommonFieldInputs inputs={inputs} setInputs={setInputs} action={'update'} />
        
        <ActionBtn inputs={inputs} setInputs={setInputs} handleUpdateHoldingData={handleUpdateHoldingData} tickerSymbol={tickerSymbol} loadingUpdateHoldingData={loadingUpdateHoldingData} />
      </ModalBoxLarge>
    </>
  )
}

export default UpdateHoldingFromPortfolio;


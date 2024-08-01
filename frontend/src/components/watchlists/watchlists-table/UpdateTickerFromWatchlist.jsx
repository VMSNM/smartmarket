import React, { useEffect, useState } from 'react'
import { Divider, Stack } from '@mui/material';
import { BodyTextTitle } from '../../../styles/main';
import { useWatchlistsContext } from '../../../context/WatchlistsContext';
import useGetWatchlistsFromUser from '../../../hooks/watchlists/useGetWatchlistsFromUser';
import useUpdateTickerData from '../../../hooks/watchlists/useUpdateTickerData';
import FieldInputs from './update-ticker/FieldInputs';
import ActionBtn from './update-ticker/ActionBtn';
import CheckboxUpdateTickers from './update-ticker/CheckboxUpdateTickers';
import { useCommonModalContext } from '../../../context/CommonModalContext';
import { ModalBoxLarge } from '../../../styles/modal';

const UpdateTickerFromWatchlist = ({tickerSymbol}) => {
  const { value: {watchlists, watchlistSelected, setWatchlists}} = useWatchlistsContext();
  const { value: { resetModalContent }} = useCommonModalContext();

  const { loadingUpdateTickerData, updateTickerData } = useUpdateTickerData();
  const { loadingWatchlists, getWatchlistsFromUser } = useGetWatchlistsFromUser();

  const [inputs, setInputs] = useState({
    input1: 0,
    input2: '',
    checkboxSelected: false
  })

  const handleUpdateTickerData = async () => {
    await updateTickerData(watchlistSelected, tickerSymbol, inputs.input1, inputs.input2, inputs.checkboxSelected);
    resetModalContent();
    const data = await getWatchlistsFromUser();
    if (data) {
        setWatchlists(data);
    }
  }

  useEffect(() => {
    let tickerData = watchlists?.find(element => element._id === watchlistSelected)?.tickers?.find(ticker => ticker.symbol === tickerSymbol);
    setInputs({
      input1: tickerData.priceTarget,
      input2: tickerData.notes
    })
  }, [watchlists, watchlistSelected]);

  return (
  <>
    <ModalBoxLarge>
      <Stack mb={1}>
          <BodyTextTitle variant='subtitle1'>Update {tickerSymbol} ticker</BodyTextTitle>
          <Divider />
      </Stack>
      
      <FieldInputs inputs={inputs} setInputs={setInputs} />

      <CheckboxUpdateTickers tickerSymbol={tickerSymbol} inputs={inputs} setInputs={setInputs} />

      <ActionBtn inputs={inputs} setInputs={setInputs} handleUpdateTickerData={handleUpdateTickerData} loadingUpdateTickerData={loadingUpdateTickerData} />
    </ModalBoxLarge>
  </>
  )
}

export default UpdateTickerFromWatchlist;


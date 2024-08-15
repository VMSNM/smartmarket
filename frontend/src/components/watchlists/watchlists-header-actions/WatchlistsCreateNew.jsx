import React, { useState } from 'react'
import { Button, CircularProgress, Divider, Stack } from '@mui/material';
import useCreateWatchlist from '../../../hooks/watchlists/useCreateWatchlist';
import { BodyText, BodyTextTitle, FormInputText, FormPrimaryActionBtn, LoadingBox } from '../../../styles/main';
import { useWatchlistsContext } from '../../../context/WatchlistsContext';
import useGetWatchlistsFromUser from '../../../hooks/watchlists/useGetWatchlistsFromUser';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import toast from 'react-hot-toast';
import { useCommonModalContext } from '../../../context/CommonModalContext';
import { ModalBoxSmall } from '../../../styles/modal';

const WatchlistsCreateNew = () => {
  const { value: {watchlists, setWatchlists, setWatchlistSelected}} = useWatchlistsContext();
  const { value: { resetModalContent }} = useCommonModalContext();

  const { loadingCreateWatchlist, createWatchlist } = useCreateWatchlist();
  const { loadingWatchlists, getWatchlistsFromUser } = useGetWatchlistsFromUser();

  const [inputs, setInputs] = useState({input1: '', input2: ''})

  const handleCreateWatchlist = async () => {
    await createWatchlist(inputs.input1, inputs.input2);
    resetModalContent();
    const data = await getWatchlistsFromUser();
    if (data) {
        setWatchlists(data);
        setWatchlistSelected(data[data.length - 1]?._id);
    }
  }

    const handleFormData = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      setInputs({...inputs, [name]: value});
  }
  
  const validateData = () => {
      if (inputs?.input1?.length < 4) return toast.error('Watchlist name must have at least 4 characters');
      handleCreateWatchlist();
  }

  return (
  <>
    <ModalBoxSmall>
        <Stack mb={2}>
            <BodyTextTitle variant='subtitle1'>Create new watchlist</BodyTextTitle>
            <Divider />
        </Stack>
    
        <Stack gap={4}>
          <FormInputText required autoFocus type="text" label="Watchlist name" name="input1" value={inputs?.input1} onChange={handleFormData} placeholder={`My watchlist ${watchlists?.length + 1}`} />

          <FormInputText multiline type="text" label="Watchlist description" name="input2" value={inputs?.input2} onChange={handleFormData} />
        </Stack>

        <FormPrimaryActionBtn
            title={'Create watchlist'} 
            disabled={loadingCreateWatchlist}
            variant="outlined" 
            startIcon={<AddCircleOutlineIcon />}
            onClick={validateData}
        >
            {loadingCreateWatchlist ? <CircularProgress size="1.5rem" /> : <BodyText variant='body2'>Create watchlist</BodyText> }
        </FormPrimaryActionBtn>
    </ModalBoxSmall>
  </>
  )
}

export default WatchlistsCreateNew;


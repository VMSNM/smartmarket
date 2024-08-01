import React, { useEffect, useState } from 'react'
import { Button, CircularProgress, Divider, Stack } from '@mui/material';
import { BodyText, BodyTextTitle, FormInputText, FormPrimaryActionBtn, LoadingBox } from '../../../styles/main';
import { useWatchlistsContext } from '../../../context/WatchlistsContext';
import useGetWatchlistsFromUser from '../../../hooks/watchlists/useGetWatchlistsFromUser';
import SaveIcon from '@mui/icons-material/Save';
import toast from 'react-hot-toast';
import useUpdateWatchlist from '../../../hooks/watchlists/useUpdateWatchlist';
import { useCommonModalContext } from '../../../context/CommonModalContext';
import { ModalBoxSmall } from '../../../styles/modal';

const WatchlistsEdit = () => {
  const { value: {watchlists, watchlistSelected, setWatchlists}} = useWatchlistsContext();
  const { value: { resetModalContent }} = useCommonModalContext();

  const { loadingUpdateWatchlist, updateWatchlist } = useUpdateWatchlist();
  const { loadingWatchlists, getWatchlistsFromUser } = useGetWatchlistsFromUser();

  const [inputs, setInputs] = useState({
    input1: '',
    input2: ''
  })

  const handleUpdateWatchlist = async () => {
    await updateWatchlist(watchlistSelected, inputs.input1, inputs.input2);
    resetModalContent();
    const data = await getWatchlistsFromUser();
    if (data) {
        setWatchlists(data);
    }
  }

    const handleFormData = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      setInputs({...inputs, [name]: value});
  }
  
  const validateData = () => {
      if (inputs?.input1?.length < 4) return toast.error('Watchlist name must have at least 4 characters');
      handleUpdateWatchlist();
  }

  useEffect(() => {
    setInputs({
      input1: watchlists?.find(element => element._id === watchlistSelected)?.name,
      input2: watchlists?.find(element => element._id === watchlistSelected)?.description
    })
  }, [watchlists, watchlistSelected]);

  return (
    <>
      <ModalBoxSmall>
          <Stack mb={2}>
              <BodyTextTitle variant='subtitle1'>Update watchlist</BodyTextTitle>
              <Divider />
          </Stack>
      

          <Stack gap={4}>
            <FormInputText required autoFocus type="text" label="Watchlist name" name="input1" value={inputs?.input1} onChange={handleFormData} />

            <FormInputText multiline rows={4} type="text" label="Watchlist description" name="input2" value={inputs?.input2} onChange={handleFormData} />
          </Stack>

          <FormPrimaryActionBtn
              disabled={loadingUpdateWatchlist}
              title={'Update watchlist'} 
              variant="outlined" 
              startIcon={<SaveIcon />}
              onClick={validateData}
          >
              {loadingUpdateWatchlist ? <CircularProgress size="1.5rem" /> : <BodyText variant='body2'>Update watchlist</BodyText> }
          </FormPrimaryActionBtn>
      </ModalBoxSmall>
    </>
  )
}

export default WatchlistsEdit;


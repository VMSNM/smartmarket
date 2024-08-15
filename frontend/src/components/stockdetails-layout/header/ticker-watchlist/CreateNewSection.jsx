import { Stack, TextField, styled, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { Colors } from '../../../../styles/theme';
import { useWatchlistsContext } from '../../../../context/WatchlistsContext'
import CreateNewBtn from './CreateNewBtn';
import { CreateNewWatchlistSection } from '../../../../styles/watchlists';

const CreateNewSection = () => {
  const { value: {watchlists}} = useWatchlistsContext();
  const [newWatchlistName, setNewWatchlistName] = useState('');
  const theme  = useTheme();

  const handleWatchlistName = (e) => {
    e.preventDefault();
    setNewWatchlistName(e.target.value)
  }
  const [inputs, setInputs] = useState('');

  return (
    <>
    <CreateNewWatchlistSection>
        <TextField 
          label="Create new watchlist" 
          placeholder={`My watchlist ${watchlists?.length + 1}`} 
          inputProps={{style: {fontSize: 14}}}
          InputLabelProps={{style: {fontSize: 14}}}
          value={newWatchlistName}
          /* onClickCapture={stopImmediatePropagation} */
          onKeyDown={e => e.stopPropagation()}
          onChange={handleWatchlistName}
        />
        <CreateNewBtn newWatchlistName={newWatchlistName} setNewWatchlistName={setNewWatchlistName} />
    </CreateNewWatchlistSection>
    </>
  )
}

export default CreateNewSection
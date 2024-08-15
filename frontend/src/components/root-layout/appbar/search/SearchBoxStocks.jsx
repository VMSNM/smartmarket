import React, { useState } from 'react';
import { SearchBoxContainer, SearchField } from '../../../../styles/root-layout/mainappbar';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Colors } from '../../../../styles/theme';
import { useNavigate } from 'react-router-dom';

const SearchBoxStocks = () => {
  const navigate = useNavigate();

  const [tickerSearched, setTickerSearched] = useState('');
  const validateTicker = (e) => {
    navigate(`/stockDetails/${tickerSearched}/overview`);
    setTickerSearched('');
  }
  return (
    <SearchBoxContainer>
        <IconButton onClick={validateTicker}>
            <SearchIcon sx={{ color: Colors.primary, fontSize: { xs: '1rem', md: '1.5rem' } }}/>
        </IconButton>
        <SearchField 
          fullWidth 
          color="secondary" 
          variant="standard" 
          placeholder="search stock..." 
          InputProps={{ disableUnderline: true }} 
          value={tickerSearched} 
          onChange={(e) => setTickerSearched(e.target.value.toUpperCase())} 
        />
    </SearchBoxContainer>
  )
}

export default SearchBoxStocks
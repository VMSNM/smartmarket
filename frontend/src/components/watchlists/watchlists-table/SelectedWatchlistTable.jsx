import { Box, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { columns, handleSetRows } from './WatchlistsTableConfig.jsx';
import { useNavigate } from 'react-router-dom';
import { StyledDataGrid } from '../../../styles/datagrid-tables';
import { useWatchlistsContext } from '../../../context/WatchlistsContext.jsx';
import { BodyText, LoadingBox } from '../../../styles/main/index.js';
import DeleteTickerFromWatchlist from './DeleteTickerFromWatchlist.jsx';
import UpdateTickerFromWatchlist from './UpdateTickerFromWatchlist.jsx';
import { useCommonModalContext } from '../../../context/CommonModalContext.jsx';

const SelectedWatchlistTable = () => {
  const { value: { watchlists, watchlistSelected }} = useWatchlistsContext();
  const { value: { setCommonModalOpen, setCommonModalContent }} = useCommonModalContext();

  const [tableRows, setTableRows] = useState(null);
  const navigate = useNavigate();

  const handleOnCellClick = (params) => {
    const { field, row } = params;
    let whatTicker = tableRows.find(element => element.id === params.id);

    if (field === 'tickerSymbol') navigate(`/stockDetails/${whatTicker.tickerSymbol}/overview`);
    
    if (field === 'priceTarget' || field === 'notes') {
      setCommonModalContent(<UpdateTickerFromWatchlist tickerSymbol={row.tickerSymbol} />)
      setCommonModalOpen(true);
      return;
    }
    if (field === 'delete') {
      setCommonModalContent(<DeleteTickerFromWatchlist tickerSymbol={row.tickerSymbol} />)
      setCommonModalOpen(true);
      return;
    }
  };

  useEffect(() => {
    let watchlist = watchlists?.find(element => element._id === watchlistSelected);
    setTableRows(handleSetRows(watchlist));
  }, [watchlistSelected, watchlists]);

  return (
    <>
    { !tableRows || !watchlistSelected ?
      <LoadingBox>
          <CircularProgress />
      </LoadingBox>

    : tableRows.length === 0 ? <BodyText variant='subtitle2'>No tickers on this watchlist</BodyText>

    : <Box sx={{ height: 'auto', width: '100%' }}>
        <StyledDataGrid
          rows={tableRows}
          columns={columns}
          columnVisibilityModel={{id: false,}}
          initialState={{
            sorting: {
              sortModel: [{ field: 'tickerSymbol', sort: 'asc' }],
            },
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          sx={{fontWeight: '500', '& .MuiDataGrid-cell:hover': {color: 'primary.main'}}}
          onCellClick={handleOnCellClick}
          disableRowSelectionOnClick
          /* checkboxSelection */
        />
      </Box>
    }
    </>
  )
}

export default SelectedWatchlistTable;


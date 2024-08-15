import React, { useEffect, useState } from 'react'
import { useCommonModalContext } from '../../../../context/CommonModalContext';
import { useNavigate } from 'react-router-dom';
import { columns, handleSetRows } from './PortfolioTableConfig';
import { BodyText, LoadingBox } from '../../../../styles/main';
import { Box, CircularProgress } from '@mui/material';
import { StyledDataGrid } from '../../../../styles/datagrid-tables';
import DeleteHoldingFromPortfolio from './DeleteHoldingFromPortfolio';
import UpdateHoldingFromPortfolio from './update-holding/UpdateHoldingFromPortfolio';

const SelectedPortfolioTableData = ({portfolio}) => {
    const { value: { setCommonModalOpen, setCommonModalContent }} = useCommonModalContext();

    const [tableRows, setTableRows] = useState(null);
    const navigate = useNavigate();

    const handleOnCellClick = (params) => {
      
      const { field, row } = params;
      let whatTicker = tableRows.find(element => element.id === params.id);
      
      if (field === 'tickerSymbol') navigate(`/stockDetails/${whatTicker.tickerSymbol}/overview`);

      if (field === 'shares' || field === 'avgBuyPrice' || field === 'notes') {
        setCommonModalContent(<UpdateHoldingFromPortfolio tickerSymbol={row.tickerSymbol} />)
        setCommonModalOpen(true);
        return;
      }
      if (field === 'delete') {
        setCommonModalContent(<DeleteHoldingFromPortfolio tickerSymbol={row.tickerSymbol} />)
        setCommonModalOpen(true);
        return;
      }
    };
  
    useEffect(() => { setTableRows(handleSetRows(portfolio)); }, [portfolio]);

    return (
      <>
      { !tableRows || !portfolio ?
      <LoadingBox>
          <CircularProgress />
      </LoadingBox>

    : tableRows.length === 0 ? <BodyText variant='subtitle2'>No holdings on this portfolio</BodyText>

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
          sx={{fontWeight: '500', /* '& .MuiDataGrid-cell:hover': {color: 'primary.main'} */}}
          onCellClick={handleOnCellClick}
          disableRowSelectionOnClick
          /* checkboxSelection */
        />
      </Box>
    }
    </>
  )
}

export default SelectedPortfolioTableData
import LockIcon from '@mui/icons-material/Lock';
import { USDollar2Dig } from '../../../utils/useful';
import DeleteTickerFromWatchlist from './DeleteTickerFromWatchlist';
import { IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { red } from '@mui/material/colors';
import { Colors } from '../../../styles/theme';

const columns = [
    { 
      field: 'id', 
      headerName: 'ID', 
      hide: true 
    },
    { 
      field: 'tickerSymbol', 
      headerName: 'Ticker', 
      align:'left',
      flex: 1,
      minWidth: 120,
      justifyContent:'flex-start',
      cellClassName: 'table-title left-align-cell clickable-cell',
      headerClassName: 'table-header',
    },
    { 
      field: 'currentPrice', 
      headerName: 'Current Price', 
      flex: 1,
      minWidth: 120,
      cellClassName: '', 
      sortable: false, 
      filterable: false, 
      headerAlign: 'center', 
      headerClassName: 'table-header',
      renderCell: () => <LockIcon /> 
    },
    { 
      field: 'marketCap', 
      headerName: 'Market Cap', 
      flex: 1,
      minWidth: 120,
      cellClassName: '', 
      sortable: false, 
      filterable: false, 
      headerAlign: 'center', 
      headerClassName: 'table-header',
      renderCell: () => <LockIcon /> 
    },
    { 
      field: 'pillarsScore', 
      headerName: '10 Pillars Score', 
      flex: 1,
      minWidth: 120,
      cellClassName: '',
      sortable: false, 
      filterable: false, 
      headerAlign: 'center', 
      headerClassName: 'table-header',
      renderCell: () => <LockIcon /> 
    },
    { 
      field: 'intrinsicValue', 
      headerName: 'Intrinsic Value', 
      flex: 1,
      minWidth: 120,
      cellClassName: '',
      sortable: false, 
      filterable: false, 
      headerAlign: 'center', 
      headerClassName: 'table-header',
      renderCell: () => <LockIcon /> 
    },
    { 
      field: 'priceTarget', 
      headerName: 'Price Target', 
      flex: 1,
      minWidth: 90,
      type: 'number', 
      headerAlign: 'center', 
      headerClassName: 'table-header',
      cellClassName: 'clickable-cell',
      renderCell: (cellValues) => USDollar2Dig.format(cellValues.value)
      /*OR valueGetter: (value) => { return USDollar2Dig.format(value) } */
    },
    { 
      field: 'notes', 
      headerName: 'Notes', 
      headerAlign: 'center', 
      flex: 1,
      minWidth: 220,
      headerClassName: 'table-header',
      cellClassName: 'clickable-cell',
      sortable: false,
      renderCell: (cellValues) => {
        return (
          cellValues.value.length > 25 ? `${cellValues.value.slice(0,25)}...` : cellValues.value
      )}
    },
    { 
      field: "delete", 
      headerName: 'Delete', 
      flex: 1,
      minWidth: 60,
      headerAlign: 'center', 
      cellClassName: '',
      headerClassName: 'table-header',
      sortable: false, 
      renderCell: (cellValues) => {
        return (
            //<DeleteTickerFromWatchlist tickerSymbol={cellValues.row.tickerSymbol} />
            <IconButton>
                <DeleteForeverIcon 
                    sx={{
                        fontSize:'22px',
                        color: red[500], 
                        transition: '.8s all', 
                        ':hover': { color: Colors.primary }
                    }} 
                />
            </IconButton>
      )},
    }
  ];
  
  const handleSetRows = (watchlist) => {
    let rows = [];
      (watchlist && watchlist?.tickers.map(element => {
        let newRow = { 
          id: element._id, 
          tickerSymbol: element.symbol,
          currentPrice: '',
          marketCap: '',
          pillarsScore: '',
          intrinsicValue: '',
          priceTarget: element.priceTarget, 
          notes: element.notes ,
          delete: ''
        }
        rows.push(newRow);
      }))
      return rows;
  }

  export { columns, handleSetRows }
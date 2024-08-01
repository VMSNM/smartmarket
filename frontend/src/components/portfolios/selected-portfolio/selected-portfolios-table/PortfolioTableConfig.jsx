import { IconButton, Stack } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { red } from '@mui/material/colors';
import { Percent, USDollar2Dig } from '../../../../utils/useful';
import { Colors } from '../../../../styles/theme';
import { BodyText } from '../../../../styles/main';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

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
      minWidth: 90,
      justifyContent:'flex-start',
      cellClassName: 'table-title left-align-cell clickable-cell',
      headerClassName: 'table-header-editable',
    },
    { 
      field: 'currentPrice', 
      headerName: 'Current Price', 
      flex: 1,
      minWidth: 100,
      cellClassName: '', 
      headerAlign: 'center', 
      headerClassName: 'table-header',
      type: 'number',
      renderCell: (cellValues) => USDollar2Dig.format(cellValues.value)
    },
    { 
      field: 'dayChange', 
      headerName: 'Day Change',
      flex: 1,
      minWidth: 90,
      cellClassName: '', 
      sortable: false, 
      filterable: false, 
      headerAlign: 'center', 
      headerClassName: 'table-header',
      renderCell: (cellValues) => {
        return (
          <Stack 
            direction={'row'} 
            alignItems={'center'} 
            gap={.5}
            sx={{color: cellValues.value < 0 ? red[800] : Colors.success}}
          >
            {Percent(cellValues.value * 100)}

            { cellValues.value < 0 
              ? <ArrowDownwardIcon 
                  sx={{fontSize:'14px', color: cellValues.value < 0 ? red[800] : Colors.success}} 
                /> 
              : <ArrowUpwardIcon 
                  sx={{fontSize:'14px', color: cellValues.value < 0 ? red[800] : Colors.success}} 
                /> 
            }
          </Stack>
      )}
    },
    { 
      field: 'shares', 
      headerName: 'Shares', 
      flex: 1,
      minWidth: 60,
      type: 'number', 
      headerAlign: 'center', 
      headerClassName: 'table-header-editable',
      cellClassName: 'clickable-cell',
    },
    { 
      field: 'avgBuyPrice', 
      headerName: 'Buy Price', 
      flex: 1,
      minWidth: 80,
      type: 'number', 
      headerAlign: 'center', 
      headerClassName: 'table-header-editable',
      cellClassName: 'clickable-cell',
      renderCell: (cellValues) => USDollar2Dig.format(cellValues.value)
      /*OR valueGetter: (value) => { return USDollar2Dig.format(value) } */
    },
    { 
      field: 'positionCost', 
      headerName: 'Position Cost', 
      flex: 1,
      minWidth: 100,
      type: 'number', 
      headerAlign: 'center', 
      headerClassName: 'table-header',
      renderCell: (cellValues) => USDollar2Dig.format(cellValues.value)
    },
    { 
      field: 'positionValue', 
      headerName: 'Position Value', 
      flex: 1,
      minWidth: 120,
      type: 'number', 
      headerAlign: 'center', 
      headerClassName: 'table-header',
      renderCell: (cellValues) => USDollar2Dig.format(cellValues.value)
    },
    { 
      field: 'totalGainLoss', 
      headerName: 'Total Gain/Loss', 
      flex: 1,
      minWidth: 160,
      type: 'number', 
      headerAlign: 'center', 
      headerClassName: 'table-header',
      renderCell: (cellValues) => {
        return(
          <Stack 
            direction={'row'}
            alignItems={'center'} 
            paddingBottom={1}
            paddingTop={1}
            gap={.5}
            sx={{color: cellValues.value < 0 ? red[800] : Colors.success}}
          >
            <BodyText sx={{fontWeight:'bold !important'}} variant='body2'>{USDollar2Dig.format(cellValues.value)}</BodyText>
            <BodyText sx={{fontWeight:'bold !important'}} variant='caption'>({Percent(((cellValues.row.positionValue - cellValues.row.positionCost) / cellValues.row.positionCost) * 100)})</BodyText>
          </Stack>
      )}
    },
    { 
      field: 'percentageOfPortfolio', 
      headerName: 'Portfolio %',
      flex: 1,
      minWidth: 110,
      cellClassName: '', 
      headerAlign: 'center', 
      headerClassName: 'table-header',
      renderCell: (cellValues) => Percent(cellValues.value * 100)
    },
    { 
      field: 'notes', 
      headerName: 'Notes', 
      headerAlign: 'center', 
      flex: 1,
      minWidth: 190,
      headerClassName: 'table-header-editable',
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
      headerClassName: 'table-header-editable',
      sortable: false, 
      renderCell: (cellValues) => {
        return (
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
  
  const handleSetRows = (portfolio) => {
    let rows = [];
      (portfolio && portfolio?.tickers.map(element => {
        let newRow = { 
          id: element._id, 
          tickerSymbol: element.symbol,
          currentPrice: element.currentPrice,
          dayChange: element.dayChange,
          shares: element.sharesCount,
          avgBuyPrice: element.avgBuyPrice,
          positionCost: element.positionCost,
          positionValue: element.positionValue,
          totalGainLoss: element.positionValue - element.positionCost,
          percentageOfPortfolio: element.percentageOfPortfolio,
          notes: element.notes,
          delete: ''
        }
        rows.push(newRow);
      }))
      return rows;
  }

  export { columns, handleSetRows }
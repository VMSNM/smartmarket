import React from 'react'
import { CustomTableCell, CustomTableHead, CustomTableRow } from '../../../styles/main'

const SelectedWatchlistTableHeader = () => {
  return (
    <CustomTableHead variant={'head'}>
        <CustomTableRow>
            <CustomTableCell sx={{textAlign:'left'}}>Ticker</CustomTableCell>
            <CustomTableCell>Last Price</CustomTableCell>
            <CustomTableCell>Market Cap</CustomTableCell>
            <CustomTableCell>10 Pillars Score</CustomTableCell>
            <CustomTableCell>Intrinsic Value</CustomTableCell>
            <CustomTableCell>Price Target</CustomTableCell>
            <CustomTableCell>Notes</CustomTableCell>
            <CustomTableCell>Delete</CustomTableCell>
        </CustomTableRow>
    </CustomTableHead>
  )
}

export default SelectedWatchlistTableHeader;
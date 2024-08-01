import React from 'react'
import { Percent, USDollarCompact } from '../../../utils/useful'
import { RatedTableCell } from './styles/tablerowmodel'

const TableRowModelAverages = ({ averageValue, txtStyle, coloredData, rateValueAboveBellow, rateValuesMinAvgMax, dataFormat }) => {
  return (
    <RatedTableCell scope="row" className='table-title'
      metric={averageValue} coloredData={coloredData} rateValueAboveBellow={rateValueAboveBellow} rateValuesMinAvgMax={rateValuesMinAvgMax}
      sx={{fontStyle:txtStyle}}
    >
    { dataFormat === 'dollar-compact' 
        ? USDollarCompact.format(averageValue) 
        : dataFormat==='percent' 
                ? Percent(averageValue)
                : averageValue 
    }
    </RatedTableCell>
  )
}

export default TableRowModelAverages
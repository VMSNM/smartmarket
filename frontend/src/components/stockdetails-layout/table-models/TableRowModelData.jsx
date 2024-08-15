import React from 'react'
import { Percent, USDollarCompact } from '../../../utils/useful'
import { RatedTableCell } from './styles/tablerowmodel'

const TableRowModelData = ({ dataMetric, txtStyle, coloredData, rateValueAboveBellow, rateValuesMinAvgMax, reversed, dataFormat }) => {
    return (
        <>
        { dataMetric && dataMetric.map((element, idx) => (
            <RatedTableCell
                key={idx}
                metric={element} coloredData={coloredData} rateValueAboveBellow={rateValueAboveBellow} rateValuesMinAvgMax={rateValuesMinAvgMax}
                sx={{fontStyle: txtStyle}}
                className={(!reversed && idx === dataMetric.length -1) ? 'table-title' : reversed && idx === 0 ? 'table-title' : ''}
            >
                { dataFormat === 'dollar-compact' 
                    ? USDollarCompact.format(element)
                    : dataFormat==='percent' 
                        ? Percent(element)
                        : element 
                }
            </RatedTableCell>
        ))}
        </>
    )
}

export default TableRowModelData
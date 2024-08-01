import React from 'react'
import { CustomTableCell, CustomTableRow, RateBox, TrueFalseBox } from '../../../styles/main'
import { Percent } from '../../../utils/useful'
import { Colors } from '../../../styles/theme'
import { Box } from '@mui/material'

const Table10PillarsScoreRow = ({ metricTitle, metricValue, metricCheck, metricScore, metricRate, dataFormat }) => {
  return (
    <CustomTableRow>
        <CustomTableCell /* txtColor={Colors.primary} */ scope="row" className='table-title' sx={{textAlign:'left'}}>
            {metricTitle} 
        </CustomTableCell>

        <CustomTableCell scope="row">
            { dataFormat === 'percentage' ? Percent(metricValue) : metricValue }
        </CustomTableCell>

        <CustomTableCell scope="row">
            <TrueFalseBox trueFalse={metricCheck}>
                {metricCheck}
            </TrueFalseBox>
        </CustomTableCell>

        <CustomTableCell 
            /* txtColor={metricScore > 0.75 ? Colors.success : metricScore > 0.5 ? Colors.success_light : metricScore > 0.25 ? Colors.warning : metricScore > 0 ? Colors.danger_light : Colors.danger} */ 
            scope="row" 
            /* className='table-title' */
        >
            <RateBox score={metricScore}>
                {metricScore}
            </RateBox>
        </CustomTableCell>

        <CustomTableCell scope="row">
            <RateBox score={metricScore}>
                {metricRate}
            </RateBox>
        </CustomTableCell>
    </CustomTableRow>
  )
}

export default Table10PillarsScoreRow
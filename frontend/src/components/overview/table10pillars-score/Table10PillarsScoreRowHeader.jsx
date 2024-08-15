import React from 'react'
import { CustomTableCell, CustomTableRow } from '../../../styles/main'
import { Colors } from '../../../styles/theme'

const Table10PillarsScoreRowHeader = ({metricTitle}) => {
  return (
    <CustomTableRow>
        <CustomTableCell 
            bgColor={Colors.secondary} sx={{textAlign:'left', textShadow:`1px 1px 2px ${Colors.black}`, color: `${Colors.white} !important`, fontSize: '14px !important', fontWeight:'bold !important'}} className='table-title' 
        >
            {metricTitle}
        </CustomTableCell>
        <CustomTableCell bgColor={Colors.primary} />
        <CustomTableCell bgColor={Colors.primary} />
        <CustomTableCell bgColor={Colors.primary} />
        <CustomTableCell bgColor={Colors.primary} />
    </CustomTableRow>
  )
}

export default Table10PillarsScoreRowHeader
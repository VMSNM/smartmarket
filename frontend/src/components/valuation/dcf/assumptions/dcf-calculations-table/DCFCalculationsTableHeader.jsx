import React from 'react'
import { CustomTableRow } from '../../../../../styles/main'
import { DCFTableCell } from '../../../../../styles/dcf-assumptions'
import { Colors } from '../../../../../styles/theme'

const DCFCalculationsTableHeader = () => {
  return (
    <>
    <CustomTableRow>
        <DCFTableCell/>
        <DCFTableCell/>
        <DCFTableCell txtColor={Colors.primaryBG} sx={{borderBottom:`1px solid ${Colors.primaryBG} !important`}}>
            Assumptions
        </DCFTableCell>
        <DCFTableCell/>
    </CustomTableRow>

    <CustomTableRow>
        <DCFTableCell/>
        <DCFTableCell txtColor={Colors.primaryBG}>
            Low
        </DCFTableCell>
        <DCFTableCell txtColor={Colors.primaryBG}>
            Mid
        </DCFTableCell>
        <DCFTableCell txtColor={Colors.primaryBG}>
            High
        </DCFTableCell>
    </CustomTableRow>
    </>
  )
}

export default DCFCalculationsTableHeader
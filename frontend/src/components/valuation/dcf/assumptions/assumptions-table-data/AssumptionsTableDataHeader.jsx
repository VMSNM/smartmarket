import React from 'react'
import { CustomTableRow } from '../../../../../styles/main'
import { DCFTableCell } from '../../../../../styles/dcf-assumptions'
import { Colors } from '../../../../../styles/theme'

const AssumptionsTableDataHeader = () => {
  return (
    <>
    <CustomTableRow>
        <DCFTableCell/>
        <DCFTableCell/>
        <DCFTableCell sx={{borderBottom:`1px solid ${Colors.border} !important`, textAlign:'right !important', paddingRight: '0px'}}>
            Historical
        </DCFTableCell>
        <DCFTableCell sx={{borderBottom:`1px solid ${Colors.border} !important`, textAlign:'left !important',  paddingLeft: '10px'}}>
            Data
        </DCFTableCell>
        <DCFTableCell/>
        <DCFTableCell/>
        <DCFTableCell txtColor={Colors.primaryBG} sx={{borderBottom:`1px solid ${Colors.primaryBG} !important`}}>
            Assumptions
        </DCFTableCell>
        <DCFTableCell/>
    </CustomTableRow>

    <CustomTableRow>
        <DCFTableCell/>
        <DCFTableCell>
            Last Year
        </DCFTableCell>
        <DCFTableCell>
            Avg 2Yrs
        </DCFTableCell>
        <DCFTableCell>
            Avg 5Yrs
        </DCFTableCell>
        <DCFTableCell>
            CAGR
        </DCFTableCell>
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

export default AssumptionsTableDataHeader
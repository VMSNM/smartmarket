import React from 'react'
import { CustomTableCell } from '../../../styles/main'
import { IconButton, Stack } from '@mui/material';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Colors } from '../../../styles/theme';

const TableRowModelTitle = ({ title, titleBold, txtStyle, identLevel, showExpandableMetric = null, handleExpand }) => {

    const StyledTitle = {
        textAlign:'left',
        fontStyle: txtStyle,
        paddingLeft: identLevel == 1 ? '30px !important' : identLevel == 1.5 ? '45px !important' : identLevel == 2 ? '60px !important' : '15px'
    }

    return (
        <CustomTableCell
            scope="row" 
            className={titleBold ? 'table-title' : ''}
            sx={StyledTitle}
        >
            <Stack direction={'row'} alignItems={'center'} gap={0.5}>
                { showExpandableMetric !== null && (
                    <IconButton sx={{zIndex: 995, padding: 0}} onClick={handleExpand}>
                        { showExpandableMetric &&  <KeyboardArrowDownRoundedIcon sx={StyledArrow} />}
                        { !showExpandableMetric &&  <ChevronRightRoundedIcon sx={StyledArrow} /> }
                    </IconButton>
                )}
                {title}
            </Stack>
        </CustomTableCell>
    )
}

export default TableRowModelTitle;



const StyledArrow = {
    color: Colors.primary, 
    fontSize:'25px',
    transition:'.7s all',
    ':hover': {
        color: Colors.white
    }

}
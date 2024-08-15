import React from 'react'
import { CustomTableCell, CustomTableRow } from '../../../styles/main'
import { Colors } from '../../../styles/theme'
import { useStockDetailsContext } from '../../../context/StockDetailsContext'
import { Box, styled } from '@mui/material'

const ScoreBox = styled(Box, {
    shouldForwardProp: (props) => props !== 'score'
})(({ theme, score }) => ({
    fontWeight:'bold',
    fontSize:'16px',
    paddingBottom: '5px',
    paddingTop: '5px',
    borderRadius: '5px',
    maxWidth: '70%',
    marginLeft:'15%',
    marginRight:'15%',
    textShadow: `1px 1px 2px ${Colors.black}`,
    backgroundColor: score >= 8.5 ? Colors.success : score >= 7  ? Colors.success_light : score >= 5 ? Colors.warning : score == 3 ? Colors.danger_light : Colors.danger,
    color: Colors.white
}))

const Table10PillarsScoreRowTotals = () => {
    const { value: { pillars10Metrics }} = useStockDetailsContext();
    const { totals } = pillars10Metrics;

    return (
        <CustomTableRow>
            <CustomTableCell 
                bgColor={Colors.primary} sx={{textAlign:'left', textShadow:`1px 1px 2px ${Colors.black}`, color: `${Colors.white} !important`, fontSize: '16px !important', fontWeight:'bold !important'}} className='table-title' 
            >
                Total Score
            </CustomTableCell>
            <CustomTableCell bgColor={Colors.secondary}/>
            <CustomTableCell bgColor={Colors.secondary}>
                <ScoreBox score={totals?.totalChecks}>
                    {totals?.totalChecks} / 10
                </ScoreBox>
            </CustomTableCell>
            <CustomTableCell bgColor={Colors.secondary}>
                <ScoreBox score={totals?.totalScore}>
                    {totals?.totalScore}
                </ScoreBox>
            </CustomTableCell>
            <CustomTableCell bgColor={Colors.secondary}>
                <ScoreBox score={totals?.totalScore}>
                    {totals?.totalRate}
                </ScoreBox>
            </CustomTableCell>
        </CustomTableRow>
    )
}

export default Table10PillarsScoreRowTotals
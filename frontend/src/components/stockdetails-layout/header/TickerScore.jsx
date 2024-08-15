import { CircularProgress, Stack } from '@mui/material'
import React from 'react'
import { CaptionText, SubtitleText } from '../../../styles/main'
import { Colors } from '../../../styles/theme'
import { useStockDetailsContext } from '../../../context/StockDetailsContext'
import { useThemeContext } from '../../../context/ThemeContext'

const TickerScore = () => {
    const {mode} = useThemeContext();
    const { value: { pillars10Metrics: { totals }}} = useStockDetailsContext();
  
    return (
        <Stack justifyContent={'right'}>
            <CaptionText variant='caption' textAlign={'right'}>Smart Score</CaptionText>
            <Stack direction={'row'} gap={.5} justifyContent={'right'}>
            <SubtitleText variant='subtitle1' wantedColor={Colors.success}>
                { !totals?.totalScore && <CircularProgress /> }
                { totals?.totalScore }
            </SubtitleText>
            <SubtitleText variant='subtitle1' wantedColor={mode === 'light' ? Colors.shaft : Colors.light}>/</SubtitleText>
            <SubtitleText variant='subtitle1' wantedColor={mode === 'light' ? Colors.shaft : Colors.light}>10</SubtitleText>
            </Stack>
        </Stack>
    )
}

export default TickerScore
import React from 'react'
import { BodyTextTitle } from '../../styles/main'
import { Divider } from '@mui/material'
import { Colors } from '../../styles/theme'

const LayoutTitle = ({title, titleSpan}) => {
  return (
    <>
    <BodyTextTitle variant='h3'>
      {title} <span style={{color: Colors.primary}}>{titleSpan}</span>
    </BodyTextTitle>
    <Divider sx={{marginTop: '10px', marginBottom: '20px'}}/>
    </>
  )
}

export default LayoutTitle
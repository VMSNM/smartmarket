import React from 'react'
import { BodyTextTitle, TitleText } from '../../styles/main'
import { Divider } from '@mui/material'

const News = () => {
  return (
    <>
      <TitleText variant='h3'>Latest News</TitleText>
      <Divider sx={{marginTop:'5px', marginBottom:'20px'}} />
      <BodyTextTitle mt={4} mb={4}>Soon avaiable</BodyTextTitle>
    </>
  )
}

export default News
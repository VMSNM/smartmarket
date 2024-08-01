import React from 'react'
import { BodyText } from '../../styles/main'
import { Colors } from '../../styles/theme'
import { useViewedContext } from '../../context/ViewedContext'

const SpotsLeftCount = () => {
    const { viewedByUser, viewedLimit: {numberOfTickers}} = useViewedContext();

    return (
        <BodyText variant='body1'>
            You have used <span style={SpanStyle}>{viewedByUser?.length}/{numberOfTickers}</span> spots of your free plan
        </BodyText>
    )
}

export default SpotsLeftCount;

const SpanStyle = {
    backgroundColor: Colors.secondary,
    color: Colors.white,
    textShadow: `1px 1px 2px ${Colors.black}`,
    padding: '7px 5px',
    borderRadius:'50%',
    margin: '0px 2px',
    fontWeight:'bold',
    fontSize:'12px'
}
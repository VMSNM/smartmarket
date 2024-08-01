import React from 'react'
import { StockDetailsBox } from '../../../../styles/stockdetails-layout'
import { Divider, Paper, Table, TableBody, TableContainer } from '@mui/material'
import { BodyTextTitle } from '../../../../styles/main'
import SummaryRowModel from './SummaryRowModel'

const Summary = ({portfolio}) => {

    const { positionValue, dayChangeToPortfolio, dayChangeValue, dayChangeToInvestments, investmentsCost, investmentsGainLoss, investmentsGainLossPercentage, cashPosition } = portfolio;

    return (
        <StockDetailsBox>
            <BodyTextTitle textAlign={'left'} variant='subtitle1'>Summary</BodyTextTitle>
            <Divider sx={{marginBottom:'25px', marginTop: '5px'}} />
            <TableContainer component={Paper}>
                <Table /* sx={{ border:`1px solid ${Colors.border}`}} */ aria-label="customized table">
                    <TableBody>
                        <SummaryRowModel 
                            title={'Portfolio Value'} 
                            value1={positionValue}
                            value2={dayChangeToPortfolio}
                        />

                        <SummaryRowModel 
                            title={'Day change to Investments'} 
                            value1={dayChangeValue}
                            value2={dayChangeToInvestments}
                        />

                        <SummaryRowModel 
                            title={'Cost of Active Investments'} 
                            value1={investmentsCost}
                        />

                        <SummaryRowModel 
                            title={'Gain/Loss on Active Investments'} 
                            value1={investmentsGainLoss}
                            value2={investmentsGainLossPercentage}
                        />
                        
                        <SummaryRowModel 
                            title={'Cash Position'} 
                            value1={cashPosition}
                        />
                    </TableBody>
                </Table>
            </TableContainer>
        </StockDetailsBox>
    )
}

export default Summary
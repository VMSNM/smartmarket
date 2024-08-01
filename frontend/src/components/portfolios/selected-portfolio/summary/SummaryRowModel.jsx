import React from 'react'
import { Percent, USDollar, USDollar2Dig } from '../../../../utils/useful'
import { BodyText, BodyTextTitle, CustomTableRow } from '../../../../styles/main'
import { Stack, TableCell } from '@mui/material'
import { Colors } from '../../../../styles/theme'
import { red } from '@mui/material/colors'

const SummaryRowModel = ({title, value1, value2 = null}) => {
    return (
    <CustomTableRow>
        <TableCell variant='body1' sx={{textAlign:'left'}}>
            <BodyTextTitle variant='body1'>{title}</BodyTextTitle>
        </TableCell>
        <TableCell sx={{textAlign:'right'}}>
            <Stack 
                direction={'row'} 
                gap={.5} 
                justifyContent={'flex-end'} 
                alignItems={'center'}
            >
                <BodyText variant='body1'>{USDollar2Dig.format(value1)}</BodyText>
                { value2 && 
                    <BodyText 
                        variant='body1'
                        sx={{color: value2 >= 0 ? Colors.success : red[800]}}
                    >
                        ({Percent(value2 * 100)})
                    </BodyText> 
                }
            </Stack>
        </TableCell>
    </CustomTableRow>
    )
}

export default SummaryRowModel
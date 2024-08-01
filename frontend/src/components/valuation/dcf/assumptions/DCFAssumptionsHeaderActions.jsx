import { Stack } from '@mui/material'
import React from 'react'
import SelectMetric from './assumptions-table-selects/SelectMetric'
import SelectMetricDate from './assumptions-table-selects/SelectMetricDate'
import AutofillBtn from './assumptions-table-autofill/AutofillBtn'
import { BodyText } from '../../../../styles/main'
import { USDollarCompact } from '../../../../utils/useful'
import { useDCFContext } from '../../../../context/DCFContext'
import { AssumptionsHeaderContainer, MetricSelectionContainer } from '../../../../styles/dcf-assumptions'

const DCFAssumptionsHeaderActions = () => {
    const { value: { assumptionsSetup }} = useDCFContext();
  
    return (
        <AssumptionsHeaderContainer>
            <MetricSelectionContainer>
                <SelectMetric />
                <Stack direction={'row'} gap={1} alignItems={'center'}>
                    <SelectMetricDate />

                    {assumptionsSetup?.baseValue && 
                        <BodyText variant="caption">
                            {USDollarCompact.format(assumptionsSetup?.baseValue)}
                        </BodyText>
                    }
                </Stack>
            </MetricSelectionContainer>
            <AutofillBtn />
        </AssumptionsHeaderContainer>
  )
}

export default DCFAssumptionsHeaderActions;


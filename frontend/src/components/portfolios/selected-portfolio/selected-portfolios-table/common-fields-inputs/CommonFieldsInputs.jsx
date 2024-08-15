import React from 'react'
import { BodyTextTitle, FormInputText } from '../../../../../styles/main'
import { Stack } from '@mui/material'
import SelectHoldingFromDropDown from './SelectHoldingFromDropDown'

const CommonFieldInputs = ({inputs, setInputs, action = ''}) => {

    const handleFormData = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setInputs({...inputs, [name]: value});
    }

    return (
        <Stack mt={2} gap={1}>
            { action !== 'update' && <SelectHoldingFromDropDown inputs={inputs} setInputs={setInputs} /> } 

            <Stack direction={'row'} alignItems={'center'} mt={2} gap={2}>
                <FormInputText required type="number" label="Number of shares" name="sharesCount" value={inputs?.sharesCount} onChange={handleFormData} />

                <FormInputText required type="number" label="Average buy price" name="avgBuyPrice" value={inputs?.avgBuyPrice} onChange={handleFormData} />
            </Stack>

            { action === 'update' && <FormInputText multiline rows={4} required type="text" label="Notes" name="notes" value={inputs?.notes} onChange={handleFormData} sx={{marginTop:'20px'}} /> } 
        </Stack>
    )
}

export default CommonFieldInputs
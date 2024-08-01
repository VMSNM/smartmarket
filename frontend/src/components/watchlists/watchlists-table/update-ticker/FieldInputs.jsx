import React from 'react'
import { BodyTextTitle, FormInputText } from '../../../../styles/main'
import { Stack } from '@mui/material'
import { Colors } from '../../../../styles/theme'

const FieldInputs = ({inputs, setInputs}) => {

    const handleFormData = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setInputs({...inputs, [name]: value});
    }

    return (
        <Stack mt={2} gap={2}>
            <BodyTextTitle sx={{color:Colors.secondary}}>Set your price target</BodyTextTitle>
            <FormInputText autoFocus type="number" label="Price Target" name="input1" value={inputs?.input1} onChange={handleFormData} />

            <BodyTextTitle mt={1} sx={{color:Colors.secondary}}>Your notes for this ticker</BodyTextTitle>
            <FormInputText multiline rows={4} type="text" label="Notes" name="input2" value={inputs?.input2} onChange={handleFormData} />
        </Stack>
    )
}

export default FieldInputs
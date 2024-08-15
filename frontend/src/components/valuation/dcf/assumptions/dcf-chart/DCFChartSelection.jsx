import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

const DCFChartSelection = ({selectedProjection, setSelectedProjection}) => {

    /* const handleChange = (e) => {
        const { value } = e.target;
        setSelectedProjection(value)
    } */
        
    return (
        <FormControl sx={{ m: 0, my: 1, minWidth: 80 }} size="small">
            <InputLabel id="demo-select-small-label">Choose Projection</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={selectedProjection}
                label={`Metric to use on DCF`}
                onChange={(e) => setSelectedProjection(e.target.value)}
                sx={{fontSize:'14px', fontWeight:'500', paddingY: '5px'}}
            >
                <MenuItem value={'all'}>All Projections</MenuItem>
                <MenuItem value={'low'}>Low Assumptions</MenuItem>
                <MenuItem value={'mid'}>Mid Assumptions</MenuItem>
                <MenuItem value={'high'}>High Assumptions</MenuItem>
            </Select>
        </FormControl>
    )
}

export default DCFChartSelection
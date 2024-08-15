import React, { useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useWatchlistsContext } from '../../../context/WatchlistsContext';

const WatchlistsSelection = () => {
    const { value: {watchlists, watchlistSelected, setWatchlistSelected}} = useWatchlistsContext();

    const handleChange = (e) => {
        const { value } = e.target;
        setWatchlistSelected(value)
    };

    /* if (watchlists?.length === 0) return; */

    return (
        <FormControl sx={{ m: 0, my: 1, minWidth: 200 }} size="small">
            <InputLabel id="demo-select-small-label">Watchlists</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={watchlistSelected || ''}
                label={`Watchlists`}
                disabled={watchlists?.length === 0 ? true : false}
                onChange={handleChange}
                sx={{fontSize:'14px', fontWeight:'500', paddingY: '5px'}}
            >
                { watchlists?.map((element, idx) => (
                    <MenuItem key={idx} value={element._id}>{element.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default WatchlistsSelection
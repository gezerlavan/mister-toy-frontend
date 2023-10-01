import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function InStock({ handleChange, inStock }) {

    if (inStock === null) inStock = ""

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Availability</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={inStock}
                label=""
                onChange={handleChange}
                name="inStock"
            >
                <MenuItem value="">
                    <em>All</em>
                </MenuItem>
                <MenuItem value="true">In Stock</MenuItem>
                <MenuItem value="false">Not in stock</MenuItem>
            </Select>
        </FormControl>
    );
}

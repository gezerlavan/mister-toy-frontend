import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export function FilterInput({ handleChange, txt }) {
    return (
        <Box
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="standard-basic" label="Search" variant="outlined" onChange={handleChange} value={txt} name='txt' />
        </Box>
    );
}
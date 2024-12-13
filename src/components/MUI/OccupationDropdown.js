import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function OccupationDropdown({ occList, setOccId, occTitle, setOccTitle }) {
    // Log `occList` to debug when it changes
    useEffect(() => {
    }, [occList]);
    // Handle change in selected occupation
    const handleOccSelection = (value)=>{
        setOccId(value.id);
        setOccTitle(value.label);
    }

    // Safely access `occupations` in `occList`
    const occupations = occList?.occupations || [];
    return (
        <Box sx={{ minWidth: 120 }}>
            <Autocomplete
                disablePortal
                options={occupations}
                renderInput={(params)=> <TextField {...params} label="Occupation" />}
                onChange={(e,v)=>handleOccSelection(v)}
            />
        </Box>
    );
}

// Wrap with React.memo to optimize re-renders
export default React.memo(OccupationDropdown);
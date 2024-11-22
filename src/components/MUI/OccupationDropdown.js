import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function OccupationDropdown({ occList, setOccId, occTitle, setOccTitle }) {
    // Log `occList` to debug when it changes
    useEffect(() => {
        
    }, [occList]);
    // Handle change in selected occupation
    const handleFilterChange = (event) => {
        const selectedId = event.target.value;
        // console.log("Occupation selected: ", selectedId,"Title selected: ",selectedTitle);
        setOccId(selectedId);
        // setOccTitle(selectedTitle);
    };

    // Safely access `occupations` in `occList`
    const occupations = occList?.occupations || [];

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="occupation-selector">Occupation</InputLabel>
                <Select
                    labelId="occupation-selector"
                    id="select-occupation"
                    value={occTitle || ""}
                    label="Occupation"
                    disabled={occupations.length === 0}
                    onChange={handleFilterChange}
                >
                    {occupations.length > 0 ? (
                        occupations.map((occupation) => (
                            <MenuItem onClick={()=>setOccTitle(occupation.title)} key={occupation.id} value={occupation.id}>
                                {occupation.title}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>No Occupations Loaded</MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
    );
}

// Wrap with React.memo to optimize re-renders
export default React.memo(OccupationDropdown);
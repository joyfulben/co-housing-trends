import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function OccupationDropdown(props) {
    const [occ, setOcc] = useState(132011);
    const handleFilterChange = (event) => {
        console.log("occupation selected: ", event.target.value);
        props.setOccId(event.target.value);
    };
    console.log("Props passed into occ dropdown: ", props.occRef);
    return ( 
    <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
        <InputLabel id="occupation-selector">Occupation</InputLabel>
        <Select
            labelId="occupation-selector"
            id="select-occupation"
            value={occ}
            label="Choose Occupation"
            onChange={handleFilterChange}
        >
            {props.occRef.occupations.map((o)=><MenuItem key={o.id} value={o.id}>{o.title}</MenuItem>)}
        </Select>
        </FormControl>
    </Box>
    );
}
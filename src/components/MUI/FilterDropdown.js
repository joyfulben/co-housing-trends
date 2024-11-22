import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FilterDropdown({filter, setFilter}) {
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="filter-label">Filter</InputLabel>
        <Select
          labelId="filter-label"
          id="filter-select"
          value={filter}
          label="Filter By"
          onChange={handleFilterChange}
        >
          <MenuItem value='alpha'>A-Z</MenuItem>
          <MenuItem value='wageAsc'>$-$$$</MenuItem>
          <MenuItem value='wageDes'>$$$-$</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
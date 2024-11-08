import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DropdownSelect(props) {
    const [filter, setFilter] = useState('alphabet');
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    if(event.target.value==="wageDes"){
        let sortedWages= props.wages.sort((a,b)=>parseFloat(b["Average Wage"]-a["Average Wage"]))
        console.log("Descending wages Chart data", sortedWages);
        props.setWages(sortedWages);
        props.formatChartData();
    }else if(event.target.value==="wageAsc"){
        let sortedWages= props.wages.sort((a,b)=>parseFloat(a["Average Wage"]-b["Average Wage"]))
        console.log("Ascending wages Chart data", sortedWages);
        props.setWages(sortedWages);
        props.formatChartData();
    }else if(event.target.value==="alphabet"){
        let sortedWages= props.wages.sort((a,b)=>(a["State"]<b["State"])?-1: (a["State"]>b["State"])? 1 : 0)
        console.log("Alphabetical Chart data", sortedWages);
        props.setWages(sortedWages);
        props.formatChartData();
    }
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
          <MenuItem value='alphabet'>A-Z</MenuItem>
          <MenuItem value='wageAsc'>$-$$$</MenuItem>
          <MenuItem value='wageDes'>$$$-$</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
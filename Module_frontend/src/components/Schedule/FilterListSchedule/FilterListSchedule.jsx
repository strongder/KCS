import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

export default function FilterListSchedule() {

  const [choise, setChoise] = useState('');

  const handleChange = (event) => {
    setChoise(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sắp xếp theo</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={choise}
          onChange={handleChange}
        >
          <MenuItem value={1}>Gần nhất</MenuItem>
          <MenuItem value={0}>Xa nhất</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
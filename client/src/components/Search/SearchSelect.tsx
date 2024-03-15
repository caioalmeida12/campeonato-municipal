import React from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const SearchSelect = ({ label, onTextChange, onSelectChange }) => {
  const options = [
    { value: 'asc', label: 'Crescente' },
    { value: 'desc', label: 'Decrescente' },
  ];

  return (
    <div>
      <FormControl variant="outlined" size="small">
        <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label={label}
          defaultValue="asc"
          onChange={onSelectChange}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SearchSelect;

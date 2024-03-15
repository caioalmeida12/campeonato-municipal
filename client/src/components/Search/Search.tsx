import React from "react";
import styles from "./Search.module.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";


const Search = ({ icon: Icon, label }) => {
  return (
    <div>
      <TextField
        id="outlined-basic"
        label={label}
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Search;

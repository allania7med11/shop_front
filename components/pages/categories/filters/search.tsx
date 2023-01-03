import { IsProduct } from "@/data/categories";
import {
  Autocomplete,
  Box,
  InputAdornment,
  Popper,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { FC } from "react";

const CustomPopper = (props) => {
  return (
    <Popper
      {...props}
      placement="bottom-start"
      style={{
        width: "300px",
      }}
    />
  );
};

const renderInput = (params) => {
  params.InputProps.startAdornment = (
    <>
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
      {params.InputProps.startAdornment}
    </>
  );
  return (
    <TextField {...params} label="Search" sx={{ backgroundColor: "white" }} />
  );
};

export const Search: FC<{ products: IsProduct[] }> = ({ products }) => {
  return (
    <Autocomplete
      PopperComponent={CustomPopper}
      id="free-solo-demo"
      freeSolo
      options={products}
      getOptionLabel={(option: IsProduct) => option.name}
      renderInput={renderInput}
      renderOption={(props, option: IsProduct) => (
        <Box
          component="li"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          {...props}
        >
          {option.name}
        </Box>
      )}
    />
  );
};

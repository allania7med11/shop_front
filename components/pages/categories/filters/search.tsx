import { IsProduct } from "@/data/categories";
import { Autocomplete, Box, InputAdornment, Popper, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import React, { FC } from "react";

export const Search: FC<{ products: IsProduct[] }> = ({ products }) => {
  const CustomPopper = React.useCallback((props) => {
    return (
      <Popper
        {...props}
        placement="bottom-start"
        style={{
          width: "300px",
        }}
      />
    );
  }, []);
  return (
    <Autocomplete
      PopperComponent={CustomPopper}
      sx={{
        root: {
          "& ul": {
            backgroundColor: "green",
          },
        },
      }}
      id="free-solo-demo"
      freeSolo
      options={products}
      getOptionLabel={(option: IsProduct) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          sx={{ backgroundColor: "white" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      )}
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

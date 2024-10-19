import { Autocomplete, Box, InputAdornment, Popper, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { FC, SyntheticEvent } from 'react';

const CustomPopper = props => {
  return (
    <Popper
      {...props}
      placement="bottom-start"
      style={{
        width: '300px',
      }}
    />
  );
};

const renderInput = params => {
  params.InputProps.startAdornment = (
    <>
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
      {params.InputProps.startAdornment}
    </>
  );
  return <TextField {...params} label="Search" sx={{ backgroundColor: 'white' }} />;
};

export const Search: FC<{
  options: string[];
  value: string[];
  setValue: (value: string[]) => void;
}> = ({ options, value, setValue }) => {
  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(_: SyntheticEvent<Element, Event>, newValue: string[]) => {
          setValue(newValue);
        }}
        PopperComponent={CustomPopper}
        id="free-solo-demo"
        freeSolo
        getOptionLabel={option => option.toString()}
        options={options}
        renderInput={renderInput}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            {...props}
          >
            {option}
          </Box>
        )}
      />
    </div>
  );
};

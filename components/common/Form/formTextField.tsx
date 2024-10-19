import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

const FormTextField = ({ name, control, defaultValue = '', rules, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextField
          error={!!fieldState.error}
          helperText={
            <>
              {fieldState?.error?.message.split('\n').map((msg, index) => (
                <React.Fragment key={index}>
                  {msg}
                  <br />
                </React.Fragment>
              ))}
            </>
          }
          {...field}
          {...props}
        />
      )}
    />
  );
};

export default FormTextField;

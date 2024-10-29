import React from 'react';
import { Controller } from 'react-hook-form';
import { RadioGroup } from '@mui/material';

const FormRadioGroupField = ({ name, control, defaultValue = '', rules, children, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => (
        <RadioGroup {...field} {...props}>
          {children}
        </RadioGroup>
      )}
    />
  );
};

export default FormRadioGroupField;

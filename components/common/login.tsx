import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { InputLabel, Paper, Typography } from '@mui/material';
import LogoSmall from './logoSmall';
import { useForm } from 'react-hook-form';
import FormTextField from './Form/formTextField';
import Cookies from "universal-cookie";

const cookies = new Cookies();


export const Login = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = async (form_data) => {
    console.log('Login successful!', form_data);
    fetch("/api/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: "same-origin",
      body: JSON.stringify({email: form_data.email, password: form_data.password}),
    })
  };

  return (
    <Paper elevation={3} sx={{
      "display": "flex",
      "padding": "32px 48px",
      "flexDirection": "column",
      "gap": "16px",
      "width": "min(100%, 500px)"
    }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "center", pb: 2 }}>
        <LogoSmall />
        <Typography variant="h6">
          Welcome To Logipsum
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <InputLabel htmlFor="email">Email</InputLabel>
            <FormTextField
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: 'Email is required' }}
              type="email"
              id="email"
              placeholder="example@gmail.com"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box>
            <InputLabel htmlFor="password">Password</InputLabel>
            <FormTextField
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: 'Password is required' }}
              type="password"
              id="password"
              placeholder="********"
              variant="outlined"
              fullWidth
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", pt: 4 }}>
          <Button type="submit" variant="contained" color="primary" >
            Login
          </Button>
        </Box>
      </form>
    </Paper>
  );
};
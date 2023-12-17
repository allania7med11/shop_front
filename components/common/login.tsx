import React from 'react';
import { useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { CircularProgress, InputLabel, Paper, Typography } from '@mui/material';
import LogoSmall from './logoSmall';
import { useForm } from 'react-hook-form';
import FormTextField from './Form/formTextField';
import { useLoginMutation } from '@/store/reducer/apis/authApi';
import { setTokens } from '@/store/reducer/slices/auth';

export const Login = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const [login, response] = useLoginMutation(); // Destructure the login mutation and loading state
  const { isLoading, error, data } = response

  const onSubmit = async (form_data) => {
    try {
      // Trigger the login mutation with the form data
      await login(form_data);

      // Check if there are any errors in the response
      if (error) {
        console.error('Login failed', error);
      } else {
        // Access the successful response data
        console.log('Login successful!', data);
        dispatch(setTokens(data))
      }

    } catch (error) {
      console.error('Login failed', error);
    }
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
          <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};
import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { CircularProgress, InputLabel, Paper, Typography } from '@mui/material';
import LogoSmall from './logoSmall';
import { useForm } from 'react-hook-form';
import FormTextField from './Form/formTextField';
import { useLoginMutation } from '@/store/reducer/apis/authApi';



export const Register = () => {
  const { control, handleSubmit } = useForm();
  const [login, response] = useLoginMutation(); 
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
            Create Your Account
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
                <InputLabel htmlFor="first_name">First Name</InputLabel>
                <FormTextField
                name="first_name"
                control={control}
                defaultValue=""
                rules={{ required: 'First Name is required' }}
                type="first_name"
                id="first_name"
                placeholder="James"
                variant="outlined"
                fullWidth
                />
            </Box>
            <Box>
                <InputLabel htmlFor="last_name">Last Name</InputLabel>
                <FormTextField
                name="last_name"
                control={control}
                defaultValue=""
                rules={{ required: 'Last Name is required' }}
                type="last_name"
                id="last_name"
                placeholder="James"
                variant="outlined"
                fullWidth
                />
            </Box>
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
            <Box>
                <InputLabel htmlFor="password">Retype Password</InputLabel>
                <FormTextField
                name="retype_password"
                control={control}
                defaultValue=""
                rules={{ required: 'Retype Password is required' }}
                type="password"
                id="retype_password"
                placeholder="********"
                variant="outlined"
                fullWidth
                />
            </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", pt: 4 }}>
          <Button type="submit" variant="contained" color="primary" >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};
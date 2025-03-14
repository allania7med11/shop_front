import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Alert, CircularProgress, InputLabel, SxProps, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useRegisterMutation } from '@/store/reducer/apis/authApi';
import useErrors from '@/hooks/useErrors';
import FormTextField from '@/components/common/Form/formTextField';
import FormPasswordField from '@/components/common/Form/formPasswordField';

const sxAuthButton: SxProps = { textTransform: 'none' };

export const RegisterForm = () => {
  const { control, handleSubmit, setError, clearErrors, getValues } = useForm();
  const [register, { isLoading, error, isSuccess }] = useRegisterMutation();
  const { globalErrors, setGlobalErrors } = useErrors(error, setError, getValues);
  const onSubmit = async form_data => {
    clearErrors();
    setGlobalErrors([]);
    await register(form_data);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ pb: 2 }}>
        <Typography variant="h6">Order as new client</Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, my: '8px' }}>
          {globalErrors &&
            globalErrors.map((error, key) => (
              <Alert key={key} severity="error">
                {error}
              </Alert>
            ))}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box>
              <InputLabel htmlFor="first_name">First Name</InputLabel>
              <FormTextField
                name="first_name"
                control={control}
                defaultValue=""
                rules={{ required: 'First Name is required' }}
                type="first_name"
                id="first_name"
                placeholder="Alexander"
                variant="outlined"
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
                placeholder="Thompson"
                variant="outlined"
              />
            </Box>
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
            <FormPasswordField
              name="password1"
              control={control}
              defaultValue=""
              rules={{ required: 'Password is required' }}
              id="password"
              placeholder="********"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box>
            <InputLabel htmlFor="password">Retype Password</InputLabel>
            <FormPasswordField
              name="password2"
              control={control}
              defaultValue=""
              rules={{ required: 'Retype Password is required' }}
              id="retype_password"
              placeholder="********"
              variant="outlined"
              fullWidth
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'end', pt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading || isSuccess}
            sx={sxAuthButton}
          >
            {isLoading || isSuccess ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Create Account'
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

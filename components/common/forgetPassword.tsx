import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Alert, CircularProgress, InputLabel, Paper, Typography } from '@mui/material';
import LogoSmall from './logoSmall';
import { useForm } from 'react-hook-form';
import FormTextField from './Form/formTextField';
import { useResetPasswordMutation } from '@/store/reducer/apis/authApi';
import useErrors from '@/hooks/useErrors';
import { sxAuthButton } from '@/styles/authButtonStyle';
import SendEmailIcon from './Icons/sendEmail';
import { grey } from '@mui/material/colors';
import { SuccessMessage } from './successMessage';

export const ForgetPassword = () => {
  const { control, handleSubmit, setError, clearErrors, getValues } = useForm();
  const [resetPassword, { isLoading, error, isSuccess }] = useResetPasswordMutation();
  const { globalErrors, setGlobalErrors } = useErrors(error, setError, getValues);

  const onSubmit = async form_data => {
    clearErrors();
    setGlobalErrors([]);
    await resetPassword(form_data);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        padding: '32px 48px',
        flexDirection: 'column',
        width: 'min(100%, 500px)',
      }}
    >
      {!isSuccess && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pb: 2,
          }}
        >
          <LogoSmall />
          <Typography variant="h6">Forgot Account Password</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, my: '8px' }}>
              {globalErrors &&
                globalErrors.map((error, key) => (
                  <Alert key={key} severity="error">
                    {error}
                  </Alert>
                ))}
            </Box>
            <Typography sx={{ px: 1, py: 2 }} color={grey[700]}>
              Enter the email address associated with your account and we will send you a link to
              reset your password.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading || isSuccess}
                sx={sxAuthButton}
                endIcon={<SendEmailIcon />}
              >
                {isLoading || isSuccess ? <CircularProgress size={24} color="inherit" /> : 'Send'}
              </Button>
            </Box>
          </form>
        </Box>
      )}
      {isSuccess && <SuccessMessage message="Your password reset link was emailed successfully" />}
    </Paper>
  );
};

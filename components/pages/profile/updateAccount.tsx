import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Alert, Avatar, Badge, CircularProgress, InputLabel, Paper, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useRegisterMutation } from '@/store/reducer/apis/authApi';
import useErrors from '@/hooks/useErrors';
import { sxAuthButton } from '@/styles/authButtonStyle';
import LogoSmall from '@/components/common/logoSmall';
import FormTextField from '@/components/common/Form/formTextField';
import useAuth from '@/hooks/useAuth';
import { IsUserProfile } from '@/data/auth';

export const UpdateAccount = () => {
  const { profile, profile_photo } = useAuth();
  const userProfile = profile as IsUserProfile;
  const { control, handleSubmit, setError, clearErrors, getValues } = useForm({
    defaultValues: {
      first_name: userProfile.first_name || '',
      last_name: userProfile.last_name || '',
    },
  });
  const [register, { isLoading, error, isSuccess }] = useRegisterMutation();
  const { globalErrors, setGlobalErrors } = useErrors(error, setError, getValues);
  const onSubmit = async form_data => {
    clearErrors();
    setGlobalErrors([]);
    await register(form_data);
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          alignItems: 'center',
        }}
      >
        <LogoSmall />
        <Typography variant="h6">Update Your Account</Typography>
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
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <Avatar alt="Camera Button" src="/static/images/camera_button.png" />
              }
            >
              <Avatar alt="Profile Photo" src={profile_photo} sx={{
                width: 175, height: 175, boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.4)', mb: 1
              }} />
            </Badge>
          </Box>
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
            <TextField
              disabled
              name="email"
              type="email"
              id="email"
              placeholder="example@gmail.com"
              defaultValue={userProfile.email || ''}
              fullWidth
              variant="filled"
              sx={{
                '& input': {
                  paddingTop: '16px',
                  paddingBottom: '16px',
                  cursor: 'not-allowed'
                },
              }}
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
          >
            {isLoading || isSuccess ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Update Account'
            )}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

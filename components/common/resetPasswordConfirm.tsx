import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Alert, CircularProgress, InputLabel, Paper, Typography } from "@mui/material";
import LogoSmall from "./logoSmall";
import { useForm } from "react-hook-form";
import { useResetPasswordMutation } from "@/store/reducer/apis/authApi";
import useErrors from "@/hooks/useErrors";
import { sxAuthButton } from "@/styles/authButtonStyle";
import { grey } from "@mui/material/colors";
import { SuccessMessage } from "./successMessage";
import FormPasswordField from "./Form/formPasswordField";

export const ResetPasswordConfirm = () => {
  const { control, handleSubmit, setError, clearErrors, getValues } = useForm();
  const [resetPassword, { isLoading, error, isSuccess }] = useResetPasswordMutation();
  const { globalErrors, setGlobalErrors } = useErrors(
    error,
    setError,
    getValues
  );

  const onSubmit = async (form_data) => {
    clearErrors();
    setGlobalErrors([]);
    await resetPassword(form_data);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        padding: "32px 48px",
        flexDirection: "column",
        width: "min(100%, 500px)",
      }}
    >

      {!isSuccess && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pb: 2,
          }}
        >
          <LogoSmall />
          <Typography variant="h6">Reset Account Password</Typography>
          <Box sx={{ width: "100%" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 1, my: "0px" }}
              >
                {globalErrors &&
                  globalErrors.map((error, key) => (
                    <Alert key={key} severity="error">
                      {error}
                    </Alert>
                  ))}
              </Box>
              <Box width="100%">
                <Typography sx={{ px: 1, py: 2 }} color={grey[700]} align="center">
                  Enter your new password
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <FormPasswordField
                    name="password1"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Password is required" }}
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
                    rules={{ required: "Retype Password is required" }}
                    id="retype_password"
                    placeholder="********"
                    variant="outlined"
                    fullWidth
                  />
                </Box>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", pt: 4 }}>
                <Button type="submit" variant="contained" color="primary" disabled={isLoading || isSuccess} sx={sxAuthButton}>
                  {isLoading || isSuccess ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      )}
      {isSuccess && <SuccessMessage message="Your password reset link was emailed successfully" />}
    </Paper>
  );
};

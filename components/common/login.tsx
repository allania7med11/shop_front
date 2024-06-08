import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Alert, CircularProgress, InputLabel, Paper, Typography } from "@mui/material";
import LogoSmall from "./logoSmall";
import { useForm } from "react-hook-form";
import FormTextField from "./Form/formTextField";
import { useLoginMutation } from "@/store/reducer/apis/authApi";
import useErrors from "@/hooks/useErrors";
import FormPasswordField from "./Form/formPasswordField";
import { sxAuthButton } from "@/styles/authButtonStyle";
import Link from "@/src/Link";
import { blue } from "@mui/material/colors";

export const Login = () => {
  const { control, handleSubmit, setError, clearErrors, getValues } = useForm();
  const [login, { isLoading, error, isSuccess }] = useLoginMutation(); // Destructure the login mutation and loading state
  const { globalErrors, setGlobalErrors } = useErrors(
    error,
    setError,
    getValues
  );

  const onSubmit = async (form_data) => {
    clearErrors();
    setGlobalErrors([]);
    await login(form_data);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        padding: "32px 48px",
        flexDirection: "column",
        gap: "16px",
        width: "min(100%, 500px)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          alignItems: "center",
          pb: 2,
        }}
      >
        <LogoSmall />
        <Typography variant="h6">Welcome To Logipsum</Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 1, my: "16px" }}
        >
          {globalErrors &&
            globalErrors.map((error, key) => (
              <Alert key={key} severity="error">
                {error}
              </Alert>
            ))}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <InputLabel htmlFor="email">Email</InputLabel>
            <FormTextField
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: "Email is required" }}
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
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
              id="password"
              placeholder="********"
              variant="outlined"
              fullWidth
            />
            <Link href="/auth/forget_password/" underline="none" color={blue[900]} sx={{ pt: 1 }}>
              Forgot password?
            </Link>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", pt: 4 }}>
          <Button type="submit" variant="contained" color="primary" disabled={isLoading || isSuccess} sx={sxAuthButton}>
            {isLoading || isSuccess ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign In"
            )}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

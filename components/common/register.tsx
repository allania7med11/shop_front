import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {
  Alert,
  CircularProgress,
  InputLabel,
  Paper,
  Typography,
} from "@mui/material";
import LogoSmall from "./logoSmall";
import { useForm } from "react-hook-form";
import FormTextField from "./Form/formTextField";
import { useRegisterMutation } from "@/store/reducer/apis/authApi";
import useErrors from "@/hooks/useErrors";

export const Register = () => {
  const { control, handleSubmit, setError, clearErrors, getValues } = useForm();
  const [register, { isLoading, error, isSuccess }] = useRegisterMutation();
  const { globalErrors, setGlobalErrors } = useErrors(error, setError, getValues);
  const onSubmit = async (form_data) => {
    clearErrors();
    setGlobalErrors([]);
    await register(form_data);
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
        <Typography variant="h6">Create Your Account</Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 1, my: "16px" }}
        >
          {globalErrors &&
            globalErrors.map((error, key) => <Alert key={key} severity="error">{error}</Alert>)}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box>
              <InputLabel htmlFor="first_name">First Name</InputLabel>
              <FormTextField
                name="first_name"
                control={control}
                defaultValue=""
                rules={{ required: "First Name is required" }}
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
                rules={{ required: "Last Name is required" }}
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
            <FormTextField
              name="password1"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
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
              name="password2"
              control={control}
              defaultValue=""
              rules={{ required: "Retype Password is required" }}
              type="password"
              id="retype_password"
              placeholder="********"
              variant="outlined"
              fullWidth
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", pt: 4 }}>
          <Button type="submit" variant="contained" color="primary" disabled={isLoading || isSuccess}>
            {isLoading || isSuccess ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Register"
            )}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

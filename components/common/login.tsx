import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { InputLabel, Paper, Typography } from '@mui/material';
import LogoSmall from './logoSmall';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <Paper elevation={3} sx={{
      "display": "flex",
      "padding": "32px 48px",
      "flexDirection": "column",
      "gap": "16px",
      "width": "min(100%, 500px)"
    }}>
      <Box sx={{display: "flex", flexDirection: "column", gap: 1, alignItems: "center", pb: 2}}>
        <LogoSmall />
        <Typography variant="h6">
          Welcome To Logipsum
        </Typography>
      </Box>
      <Box>
        <InputLabel htmlFor="email">Email</InputLabel>
        <TextField
          id="email"
          placeholder="example@gmail.com"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
      </Box>
      <Box>
        <InputLabel htmlFor="email">Password</InputLabel>
        <TextField
          id="email"
          placeholder="********"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
      </Box>
      <Box sx={{display: "flex", justifyContent: "center", pt:2}}>
        <Button sx={{ textTransform: "none" }} size="large" variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Paper>
  );
};
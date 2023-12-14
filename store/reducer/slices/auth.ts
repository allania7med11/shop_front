// authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    refreshToken: null,
  },
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    }
  },
});

export const { setTokens } = authSlice.actions;
export default authSlice.reducer;

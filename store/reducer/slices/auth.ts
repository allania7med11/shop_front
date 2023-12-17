// authSlice.js

import { AuthCredentials } from '@/data/auth';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    access: null,
    refresh: null,
  },
  reducers: {
    setTokens: (state, action: PayloadAction<AuthCredentials>) => {
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
    }
  },
});

export const authReducer = authSlice.reducer;
export const { setTokens } = authSlice.actions;

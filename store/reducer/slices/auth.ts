// authSlice.js

import { AuthCredentials } from '@/data/auth';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: AuthCredentials = {
  access: "",
  refresh: "",
}
const loadAuthState = (): AuthCredentials => {
  try {
    const serializedState = localStorage.getItem("authState");
    if (serializedState === null) {
      return initialState;
    }
    const storedState = JSON.parse(serializedState) as AuthCredentials;
    const authState = Object.keys(initialState).reduce((acc, elm) => {
      acc[elm] = storedState[elm];
      return acc;
    }, {}) as AuthCredentials;
    return authState;
  } catch {
    return initialState;
  }
};
const saveAuthState = (authState) => {
  try {
    const serializedState = JSON.stringify(authState);
    localStorage.setItem("authState", serializedState);
  } catch (err) {
    console.log(err);
  }
};


const authSlice = createSlice({
  name: 'auth',
  initialState: loadAuthState(),
  reducers: {
    setTokens: (state, action: PayloadAction<AuthCredentials>) => {
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
      saveAuthState(action.payload)
    }
  },
});

export const authReducer = authSlice.reducer;
export const { setTokens } = authSlice.actions;
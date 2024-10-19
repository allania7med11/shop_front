import { configureStore } from '@reduxjs/toolkit';
import { rootMiddleware, rootReducer } from './reducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: rootMiddleware,
});

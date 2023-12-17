import { combineReducers } from "redux";
import { api } from "./apis";
import { filtersReducer } from "./slices/filters";
import { authReducer } from "./slices/auth";

export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  filters: filtersReducer,
  auth: authReducer
});

export const rootMiddleware = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(api.middleware);

export type RootState = ReturnType<typeof rootReducer>;

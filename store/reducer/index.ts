import { combineReducers } from "redux";
import { productApi } from "./apis/productApi";
import { filtersReducer } from "./slices/filters";

export const rootReducer = combineReducers({
  [productApi.reducerPath]: productApi.reducer,
  filters: filtersReducer,
});

export const rootMiddleware = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(productApi.middleware);

export type RootState = ReturnType<typeof rootReducer>;

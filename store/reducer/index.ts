import { combineReducers } from "redux";
import { productApi } from "./apis/productApi";
import { filtersReducer } from "./slices/filters";
import { cartApi } from "./apis/cartApi";

export const rootReducer = combineReducers({
  [productApi.reducerPath]: productApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  filters: filtersReducer,
});

export const rootMiddleware = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(productApi.middleware);

export type RootState = ReturnType<typeof rootReducer>;

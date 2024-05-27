import { combineReducers } from "redux";
import { api } from "./apis";
import { filtersReducer } from "./slices/filters";
import { cartApi } from "./apis/cartApi";
import { authApi } from "./apis/authApi";  
import { productApi } from "./apis/productApi";

export const rootReducer = combineReducers({
  [productApi.reducerPath]: productApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [authApi.reducerPath]: authApi.reducer,  
  filters: filtersReducer,
});

export const rootMiddleware = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(
    productApi.middleware,
    cartApi.middleware,
    authApi.middleware 
  );

export type RootState = ReturnType<typeof rootReducer>;
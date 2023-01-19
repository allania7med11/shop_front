import { combineReducers } from "redux";
import { filtersReducer } from "./filters";

export const rootReducer = combineReducers({
  filters: filtersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

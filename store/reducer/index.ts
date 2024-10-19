import { combineReducers } from 'redux';
import { api } from './apis';
import { filtersReducer } from './slices/filters';

export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  filters: filtersReducer,
});

export const rootMiddleware = getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware);

export type RootState = ReturnType<typeof rootReducer>;

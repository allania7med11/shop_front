import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: { search: [""] },
  reducers: {
    updateSearch: (state, action: PayloadAction<string[]>) => {
      state.search = action.payload;
    }
  },
});

export const filtersReducer = filtersSlice.reducer;
export const { updateSearch } = filtersSlice.actions;

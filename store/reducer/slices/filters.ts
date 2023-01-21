import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: { categorySlug: "", search: [""] },
  reducers: {
    updateCategorySlug: (state, action: PayloadAction<string>) => {
      state.categorySlug = action.payload;
    },
    updateSearch: (state, action: PayloadAction<string[]>) => {
      state.search = action.payload;
    },
  },
});

export const filtersReducer = filtersSlice.reducer;
export const { updateCategorySlug, updateSearch } = filtersSlice.actions;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface filtersState {
  categorySlug: string;
  search: string[];
  current_price_min: string;
  current_price_max: string;
}

const initialState = {
  categorySlug: "",
  search: [""],
  current_price_min: "",
  current_price_max: ""
} as filtersState;

const filtersSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    updateCategorySlug: (state, action: PayloadAction<string>) => {
      state.categorySlug = action.payload;
    },
    updateSearch: (state, action: PayloadAction<string[]>) => {
      state.search = action.payload;
    },
    updateCurrentPriceMin: (state, action: PayloadAction<string>) => {
      state.current_price_min = action.payload;
    },
    updateCurrentPriceMax: (state, action: PayloadAction<string>) => {
      state.current_price_max = action.payload;
    },
  },
});

export const filtersReducer = filtersSlice.reducer;
export const {
  updateCategorySlug,
  updateSearch,
  updateCurrentPriceMin,
  updateCurrentPriceMax,
} = filtersSlice.actions;

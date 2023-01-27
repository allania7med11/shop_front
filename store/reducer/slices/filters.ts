import { IsProductOrder } from "@/data/categories";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface filtersState {
  categorySlug: string;
  search: string[];
  current_price_min: string;
  current_price_max: string;
  discount_min: string;
  discount_max: string;
  ordering: IsProductOrder;
}

const initialState = {
  categorySlug: "",
  search: [""],
  current_price_min: "",
  current_price_max: "",
  discount_min: "",
  discount_max: "",
  ordering: ""
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
    updateDiscount: (state, action: PayloadAction<[string,string]>) => {
      state.discount_min = action.payload[0];
      state.discount_max = action.payload[1];
    },
    updateOrdering: (state, action: PayloadAction<IsProductOrder>) => {
      state.ordering = action.payload;
    },
  },
});

export const filtersReducer = filtersSlice.reducer;
export const {
  updateCategorySlug,
  updateSearch,
  updateCurrentPriceMin,
  updateCurrentPriceMax,
  updateDiscount,
  updateOrdering
} = filtersSlice.actions;

// src/services/taskApi.js
import { IsCategory, IsProduct, IsProductFilters } from "@/data/categories";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./utils";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    categories: builder.query<IsCategory[], void>({
      query: () => "/categories/",
    }),
    category: builder.query<IsCategory, string | string[]>({
      query: (slug: string) => `/categories/${slug}/`,
    }),
    products: builder.query<IsProduct[], IsProductFilters>({
      query: (filters) => ({
        url: `/products/`,
        params: filters,
      }),
    }),
    product: builder.query<IsProduct, string | string[]>({
      query: (slug: string) => `/products/${slug}/`,
    }),
  }),
});

export const {
  useCategoriesQuery,
  useCategoryQuery,
  useProductsQuery,
  useProductQuery,
} = productApi;

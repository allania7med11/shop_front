// src/services/taskApi.js
import { IsCategory, IsProduct } from "@/data/categories";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./utils";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    categories: builder.query<IsCategory[], void>({
      query: () => "/categories",
    }),
    category: builder.query<IsCategory, string>({
      query: (slug: string) => `/categories/${slug}`,
    }),
    product: builder.query<IsProduct, string>({
      query: (slug: string) => `/products/${slug}`,
    }),
  }),
});

export const { useCategoriesQuery, useCategoryQuery, useProductQuery } = productApi;

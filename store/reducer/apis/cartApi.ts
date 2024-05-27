import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./utils";
import { IsCartItem } from "@/data/cart";
import { getCsrfToken } from "@/utils/auth";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include",
    prepareHeaders: (headers) => {
      let token = getCsrfToken()
      if (token) {
        headers.set('X-CSRFToken', token)
      }
      return headers;
    }
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    cartItems: builder.query<IsCartItem[], void>({
      query: () => "/cart_items/",
      providesTags: ["Cart"],
    }),

    createCartItem: builder.mutation<IsCartItem, Partial<IsCartItem>>({
      query: (newCartItem) => ({
        url: "/cart_items/",
        method: "POST",
        body: newCartItem,
      }),
      invalidatesTags: ["Cart"],
    }),

    deleteCartItem: builder.mutation<void, number>({
      query: (id) => ({
        url: `/cart_items/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useCartItemsQuery,
  useCreateCartItemMutation,
  useDeleteCartItemMutation,
} = cartApi;
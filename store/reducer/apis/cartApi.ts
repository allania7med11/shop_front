import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./utils";
import { IsCartItem } from "@/data/cart";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include"
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    cartItems: builder.query<IsCartItem[], void>({
      query: () => "/cart_items/",
    }),
    cartItem: builder.query<IsCartItem, string | string[]>({
      query: (id: string) => `/cart_items/${id}/`,
    }),
    createCartItem: builder.mutation<IsCartItem, Partial<IsCartItem>>({
      query: (newCartItem) => ({
        url: "/cart_items/",
        method: "POST",
        body: newCartItem,
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCartItem: builder.mutation<IsCartItem, { id: string; data: Partial<IsCartItem> }>({
      query: ({ id, data }) => ({
        url: `/cart_items/${id}/`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteCartItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `/cart_items/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCartItemsQuery,
  useCartItemQuery,
  useCreateCartItemMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
} = cartApi;
import { IsCartItem } from "@/data/cart";
import { api } from ".";

const cartApi = api.injectEndpoints({
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
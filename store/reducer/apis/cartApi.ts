import { IsAddress, IsCartItem } from "@/data/cart";
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
    createAddress: builder.mutation<IsAddress, Partial<IsAddress>>({
      query: (newAddress) => ({
        url: "/addresses/",
        method: "POST",
        body: newAddress,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});
export const {
  useCartItemsQuery,
  useCreateCartItemMutation,
  useDeleteCartItemMutation,
  useCreateAddressMutation
} = cartApi;
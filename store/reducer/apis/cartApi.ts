import { IsAddress, IsCartItem, IsCart, IsOrder } from '@/data/cart';
import { api } from '.';

const cartApi = api.injectEndpoints({
  endpoints: builder => ({
    cartItems: builder.query<IsCartItem[], void>({
      query: () => '/cart_items/',
      providesTags: ['Cart'],
    }),
    createCartItem: builder.mutation<IsCartItem, Partial<IsCartItem>>({
      query: newCartItem => ({
        url: '/cart_items/',
        method: 'POST',
        body: newCartItem,
      }),
      invalidatesTags: ['Cart'],
    }),
    deleteCartItem: builder.mutation<void, number>({
      query: id => ({
        url: `/cart_items/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
    createAddress: builder.mutation<IsAddress, Partial<IsAddress>>({
      query: newAddress => ({
        url: '/addresses/',
        method: 'POST',
        body: newAddress,
      }),
      invalidatesTags: ['Cart'],
    }),
    currentCart: builder.query<IsCart, void>({
      query: () => '/cart/current/',
      providesTags: ['Cart'],
    }),
    createOrder: builder.mutation<IsOrder, Partial<IsOrder>>({
      query: orderData => ({
        url: '/cart/',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useCreateCartItemMutation,
  useDeleteCartItemMutation,
  useCreateAddressMutation,
  useCurrentCartQuery,
  useCreateOrderMutation,
} = cartApi;

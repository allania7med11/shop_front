import { IsPaymentInfo } from "@/data/payment";
import { api } from ".";

const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    saveStripeInfo: builder.mutation<IsPaymentInfo, Partial<IsPaymentInfo>>({
      query: (newAddress) => ({
        url: "/payments/save-stripe-info/",
        method: "POST",
        body: newAddress,
      }),
    }),
  }),
});
export const {
  useSaveStripeInfoMutation
} = cartApi;
import { useStripe, useElements, CardNumberElement } from "@stripe/react-stripe-js";
import { IsOrder } from "@/data/cart";

type SetGlobalErrors = (errors: string[]) => void;

const usePayment = (setGlobalErrors: SetGlobalErrors) => {
  const stripe = useStripe();
  const elements = useElements();

  const setPaymentMethodId = async (form_data: IsOrder) => {
    if (!stripe || !elements) {
      setGlobalErrors(["Stripe has not loaded"]);
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    if (!cardElement) {
      setGlobalErrors(["Card Element not found"]);
      return;
    }

    const { error: stripeError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

    if (stripeError) {
      setGlobalErrors([stripeError.message]);
      return;
    }
    form_data.payment.payment_method_id = paymentMethod?.id;
  };

  return setPaymentMethodId;
};

export default usePayment;

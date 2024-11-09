import { useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { IsOrder } from '@/data/cart';
import { useCreateOrderMutation } from '@/store/reducer/apis/cartApi';
import useErrors from '@/hooks/useErrors';
import usePayment from './usePayment';

const useSubmitOrder = (form: UseFormReturn<IsOrder>) => {
  const { clearErrors, setError, getValues } = form;
  const [createOrder, { isLoading, error, isSuccess }] = useCreateOrderMutation();
  const { setGlobalErrors, globalErrors } = useErrors(error, setError, getValues);
  const setPaymentMethodId = usePayment(setGlobalErrors);

  const onSubmit = useCallback(
    async (form_data: IsOrder) => {
      clearErrors();
      setGlobalErrors([]);
      if (form_data.payment.payment_method === 'stripe') {
        await setPaymentMethodId(form_data);
      }
      await createOrder(form_data);
    },
    [clearErrors, setGlobalErrors, setPaymentMethodId, createOrder]
  );

  return { onSubmit, isLoading, isSuccess, globalErrors };
};

export default useSubmitOrder;

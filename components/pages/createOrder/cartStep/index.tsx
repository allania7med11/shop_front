import { CartTable } from './cartTable';
import * as React from 'react';
import { useCurrentCartQuery } from '@/store/reducer/apis/cartApi';

export const CartStep = () => {
  const { data } = useCurrentCartQuery();
  const items = data ? data.items : [];
  const total_amount = data ? data.total_amount : '';
  return <CartTable items={items} total_amount={total_amount} />;
};

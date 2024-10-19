import { createContext, Dispatch, SetStateAction } from 'react';

type OrderContextType = Dispatch<SetStateAction<number>>;

export const OrderContext = createContext<OrderContextType>(() => {});

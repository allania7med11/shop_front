import React, { createContext, Dispatch, SetStateAction } from 'react';

type OrderContextType = Dispatch<SetStateAction<number>>;

export const OrderContext = createContext<OrderContextType>(() => { });
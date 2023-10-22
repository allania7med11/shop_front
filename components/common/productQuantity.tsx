import {
  useCartItemsQuery,
  useCreateCartItemMutation,
} from "@/store/reducer/apis/cartApi";
import { useEffect, useState } from "react";
import { FetchWrap } from "@/components/common/fetchWrap";

function PositifIntegerInput({ number, setNumber }) {

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    // Allow an empty string or positive integers
    if (inputValue === '' || (Number.isInteger(parseFloat(inputValue)) && parseFloat(inputValue) >= 0)) {
      setNumber(inputValue);
    }
  };

  return (
    <input
      type="number"
      value={number}
      onChange={handleInputChange}
    />
  );
}

export const ProductQuantity: React.FC<{
  product_id: number;
}> = ({ product_id }) => {
  const {
    data: items = [],
    error: errorGet,
    isLoading: isLoadingGet,
  } = useCartItemsQuery();

  const item = items.find((elm) => elm.product == product_id);
  if (!isLoadingGet) {
    debugger
    console.log(items)
  }
  const quantity = item ? item.quantity : 0;
  const [addItem, { error: errorCreate, isLoading: isLoadingCreate }] =
    useCreateCartItemMutation();
  const isLoading = isLoadingGet && isLoadingCreate;
  const error = errorGet && errorCreate;
  const [number, setNumber] = useState(quantity);
  const createCartItem = async () => {
    if (number && number > 0) {
      try {
        const data = {
          product: product_id,
          quantity: number,
        };
        const result = await addItem(data).unwrap();

        // Handle success
        console.log("Cart item created:", result);
      } catch (error) {
        // Handle error
        console.error("Error creating cart item:", error);
      }
    }
  };
  useEffect(() => {
    createCartItem();
  }, [number]);
  useEffect(() => {
    setNumber(quantity);
  }, [quantity]);

  return (
    <FetchWrap isLoading={isLoading} error={error} data={!isLoading}>
      <PositifIntegerInput number={number} setNumber={setNumber} />
    </FetchWrap>
  );
};

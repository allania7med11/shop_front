import { Box, Button, OutlinedInput, SxProps, Theme } from "@mui/material";
import {
  useCartItemsQuery,
  useCreateCartItemMutation,
} from "@/store/reducer/apis/cartApi";
import { useEffect, useState } from "react";
import { FetchWrap } from "@/components/common/fetchWrap";

const PositifIntegerInput: React.FC<{
  number: number;
  setNumber: (value: number) => void;
}> = ({ number, setNumber }) => {
  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    // Allow an empty string or positive integers
    if (
      inputValue === "" ||
      (Number.isInteger(parseFloat(inputValue)) && parseFloat(inputValue) >= 0)
    ) {
      setNumber(inputValue);
    }
  };

  return (
    <OutlinedInput
      type="number"
      value={number}
      onChange={handleInputChange}
      margin="dense"
    />
  );
};

// Define increment and decrement styles
const sxButton: SxProps = { width: "38px", minWidth: "38px", fontSize: "24px" };

export const ProductQuantity: React.FC<{
  product_id: number;
  sx?: SxProps<Theme>;
}> = ({ product_id, sx }) => {
  const {
    data: items = [],
    error: errorGet,
    isLoading: isLoadingGet,
  } = useCartItemsQuery();

  const item = items.find((elm) => elm.product == product_id);
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
      <Box
        sx={{
          display: "flex",
          alignItems: "stretch",
          height: "38px",
          maxWidth: "160px",
          margin: "auto",
          ...sx,
        }}
      >
        {number == 0 && (
          <Button variant="contained" onClick={() => setNumber(1)}>
            Add To Cart
          </Button>
        )}
        {number > 0 && (
          <>
            <Button
              variant="contained"
              sx={sxButton}
              onClick={() => number > 0 && setNumber(number - 1)}
            >
              -
            </Button>
            <PositifIntegerInput number={number} setNumber={setNumber} />
            <Button
              variant="contained"
              sx={sxButton}
              onClick={() => setNumber(number + 1)}
            >
              +
            </Button>
          </>
        )}
      </Box>
    </FetchWrap>
  );
};

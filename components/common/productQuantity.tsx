import { Box, Button, OutlinedInput, SxProps, Theme } from "@mui/material";
import {
  useCartItemsQuery,
  useCreateCartItemMutation,
  useDeleteCartItemMutation,
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
  const [deleteItem, { error: errorDelete, isLoading: isLoadingDelete }] =
    useDeleteCartItemMutation();
  const isLoading = isLoadingGet && isLoadingCreate && isLoadingDelete;
  const error = errorGet && errorCreate && errorDelete;
  const [number, setNumber] = useState(quantity);
  const createCartItem = async (value) => {
    if (!isLoading) {
      if (value != quantity && value > 0) {
        try {
          const data = {
            product: product_id,
            quantity: value,
          };
          await addItem(data).unwrap();
          console.log("Update cart item:", value, item);
        } catch (error) {
          // Handle error
          console.error("Error creating cart item:", error);
        }
      }
      if (item && value == 0) {
        try {
          await deleteItem(item.id).unwrap();
          console.log("Delete cart item:", value,item);
        } catch (error) {
          // Handle error
          console.error("Error deleting cart item:", error);
        }
      }
    }
  };
  const setNumberAndcreateCartItem = (value) => {
    setNumber(value)
    createCartItem(value)
  }
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
          <Button
            variant="contained"
            sx={{ width: "150px" }}
            onClick={() => setNumberAndcreateCartItem(1)}
          >
            Add To Cart
          </Button>
        )}
        {number > 0 && (
          <>
            <Button
              variant="contained"
              sx={sxButton}
              onClick={() => number > 0 && setNumberAndcreateCartItem(number - 1)}
            >
              -
            </Button>
            <PositifIntegerInput number={number} setNumber={setNumberAndcreateCartItem} />
            <Button
              variant="contained"
              sx={sxButton}
              onClick={() => setNumberAndcreateCartItem(number + 1)}
            >
              +
            </Button>
          </>
        )}
      </Box>
    </FetchWrap>
  );
};

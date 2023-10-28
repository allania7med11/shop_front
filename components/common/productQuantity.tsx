import { useDebounce } from "use-debounce";
import { Box, Button, OutlinedInput, SxProps, Theme } from "@mui/material";
import {
  useCartItemsQuery,
  useCreateCartItemMutation,
  useDeleteCartItemMutation,
} from "@/store/reducer/apis/cartApi";
import { useEffect, useState } from "react";
import { FetchWrap } from "@/components/common/fetchWrap";

const PositifIntegerInput: React.FC<{
  numberInput: string;
  setNumberInput: (value: string) => void;
}> = ({ numberInput, setNumberInput }) => {
  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    // Allow an empty string or positive integers
    if (/^\d*$/.test(inputValue)) {
      setNumberInput(inputValue);
    }
  };
  return (
    <OutlinedInput
      type="text"
      value={numberInput}
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
  const [numberInput, setNumberInput] = useState(String(quantity));
  const number = parseInt(numberInput)
  const [debouncedNumber] = useDebounce(number, 500);
  const [changedNumberFromHere, setChangedNumberFromHere] = useState(true);
  const updateNumberFromHere = (value) => {
    setNumberInput(value)
    setChangedNumberFromHere(true)
  }
  const updateNumberFromOutside = (value) => {
    setNumberInput(value)
    setChangedNumberFromHere(false)
  }
  const createCartItem = async (value: number) => {
    if (!isLoading) {
      if (value != quantity && value > 0) {
        try {
          const data = {
            product: product_id,
            quantity: value,
          };
          await addItem(data).unwrap();
        } catch (error) {
          // Handle error
          console.error("Error creating cart item:", error);
        }
      }
      if (item && value === 0) {
        try {
          await deleteItem(item.id).unwrap();
        } catch (error) {
          // Handle error
          console.error("Error deleting cart item:", error);
        }
      }
    }
  };
  useEffect(() => {
    if (changedNumberFromHere && Number.isInteger(debouncedNumber)) {
      createCartItem(debouncedNumber);
    }
  }, [debouncedNumber, changedNumberFromHere]);
  useEffect(() => {
    updateNumberFromOutside(quantity);
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
        {quantity == 0 && (
          <Button
            variant="contained"
            sx={{ width: "150px" }}
            onClick={() => updateNumberFromHere(1)}
          >
            Add To Cart
          </Button>
        )}
        {quantity > 0 && (
          <>
            <Button
              variant="contained"
              sx={sxButton}
              onClick={() =>
                number > 0 && updateNumberFromHere(String(number - 1))
              }
            >
              -
            </Button>
            <PositifIntegerInput
              numberInput={numberInput}
              setNumberInput={updateNumberFromHere}
            />
            <Button
              variant="contained"
              sx={sxButton}
              onClick={() => updateNumberFromHere(String(number + 1))}
            >
              +
            </Button>
          </>
        )}
      </Box>
    </FetchWrap>
  );
};

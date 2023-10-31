import { useDebounce } from "use-debounce";
import { Box, Button, OutlinedInput, SxProps, Theme } from "@mui/material";
import {
  useCartItemsQuery,
  useCreateCartItemMutation,
  useDeleteCartItemMutation,
} from "@/store/reducer/apis/cartApi";
import { useEffect, useState } from "react";
import { FetchWrap } from "@/components/common/fetchWrap";
import { IsCartItem } from "@/data/cart";

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
      sx={{ height: "38px" }}
    />
  );
};

// Define increment and decrement styles
const sxButton: SxProps = { width: "38px", minWidth: "38px", height: "38px", fontSize: "24px" };

export const ProductQuantity: React.FC<{
  cart_item: IsCartItem;
  sx?: SxProps<Theme>;
}> = ({ cart_item, sx }) => {
  const item = cart_item;
  const quantity = item ? item.quantity : 0;
  const [addItem, { error: errorCreate, isLoading: isLoadingCreate }] =
    useCreateCartItemMutation();
  const [deleteItem, { error: errorDelete, isLoading: isLoadingDelete }] =
    useDeleteCartItemMutation();
  const isLoading = isLoadingCreate && isLoadingDelete;
  const error = errorCreate && errorDelete;
  const [numberInput, setNumberInput] = useState(String(quantity));
  const number = parseInt(numberInput);
  const [debouncedNumber] = useDebounce(number, 500);
  const displayAddCarte = numberInput === "0";
  const [changedNumberFromHere, setChangedNumberFromHere] = useState(true);
  const updateNumberFromHere = (value) => {
    setNumberInput(value);
    setChangedNumberFromHere(true);
  };
  const updateNumberFromOutside = (value) => {
    setNumberInput(value);
    setChangedNumberFromHere(false);
  };
  const createCartItem = async (value: number) => {
    if (!isLoading) {
      if (value != quantity && value > 0) {
        try {
          const data = {
            product: item.id,
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
    updateNumberFromOutside(String(quantity));
  }, [quantity]);

  return (
    <FetchWrap isLoading={isLoading} error={error} data={!isLoading}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "stretch",
          justifyContent: "center",
          maxWidth: "160px",
          ...sx,
        }}
      >
        {displayAddCarte && (
          <Button
            variant="contained"
            sx={{ width: "150px" }}
            onClick={() => updateNumberFromHere(1)}
          >
            Add To Cart
          </Button>
        )}
        {!displayAddCarte && (
          <>
            <Box sx={{ flex: "0 0 38px" }}>
              <Button
                variant="contained"
                sx={sxButton}
                onClick={() =>
                  number > 0 && updateNumberFromHere(String(number - 1))
                }
              >
                -
              </Button>
            </Box>
            <Box sx={{ flex: "1 1 100%", maxWidth:"70px"  }}>
              <PositifIntegerInput
                numberInput={numberInput}
                setNumberInput={updateNumberFromHere}
              />
            </Box>
            <Box sx={{ flex: "0 0 38px" }}>
              <Button
                variant="contained"
                sx={sxButton}
                onClick={() => updateNumberFromHere(String(number + 1))}
              >
                +
              </Button>
            </Box>
          </>
        )}
      </Box>
    </FetchWrap>
  );
};

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IsProduct } from "@/data/categories";
import { ProductQuantity } from "@/components/common/productQuantity";
import { ProductTableCell } from "./productTableCell";
import { useProductsQuery } from "@/store/reducer/apis/productApi";
import { useCartItemsQuery } from "@/store/reducer/apis/cartApi";
import { addItemsToProducts } from "@/utils/products";


export const CartTableRow: React.FC<{ product: IsProduct }> = ({ product }) => {
  return (
    <TableRow>
      <TableCell>
        <ProductTableCell product={product} />
      </TableCell>
      <TableCell>
        <ProductQuantity product_id={product.id} sx={{ margin: "auto" }} />
      </TableCell>
      <TableCell>{product.current_price}</TableCell>
    </TableRow>
  );
};

export const CartTable = () => {
  const headers = ["Name", "Quantity", "Price"];
  const { data: items = [] } = useCartItemsQuery();
  const product_ids = items.map((item) => item.product);
  const { data: productsApi = [] } = useProductsQuery(
    { id_in: product_ids },
    {
      skip: !product_ids,
    }
  );
  const products = addItemsToProducts(productsApi, items);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header, key) => (
              <TableCell key={key}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <CartTableRow product={product} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

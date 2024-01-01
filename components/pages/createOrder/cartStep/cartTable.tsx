import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { IsProduct } from "@/data/categories";
import { ProductQuantity } from "@/components/common/productQuantity";
import { ProductTableCell } from "./productTableCell";
import { useProductsQuery } from "@/store/reducer/apis/productApi";
import { useCartItemsQuery } from "@/store/reducer/apis/cartApi";
import { addItemsToProducts } from "@/utils/products";

export const CartTableRow: React.FC<{ product: IsProduct }> = ({ product }) => {
  const price = roundPrice(product.current_price * product.cart_item.quantity);
  return (
    <TableRow>
      <TableCell>
        <ProductTableCell product={product} />
      </TableCell>
      <TableCell>
        <ProductQuantity cart_item={product.cart_item} />
      </TableCell>
      <TableCell>${price}</TableCell>
    </TableRow>
  );
};

export const CartTable = () => {
  const headers = ["Name", "Quantity", "Price"];
  const { data: items = [] } = useCartItemsQuery();
  const product_ids = items.map((item) => item.product);
  let { data: productsApi = [] } = useProductsQuery(
    { id_in: product_ids },
    {
      skip: product_ids.length === 0,
    }
  );
  if(product_ids.length === 0){
     productsApi = []
  }
  const products = addItemsToProducts(productsApi, items);

  // Pagination state
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate total items and total price
  const totalItems = products.reduce(
    (acc, product) => acc + product.cart_item.quantity,
    0
  );
  const totalPrice = products.reduce(
    (acc, product) => acc + product.current_price * product.cart_item.quantity,
    0
  );

  return (
    <Paper>
      <TableContainer>
        <Table
          aria-label="simple table"
          sx={{ "& td": { padding: "12px 4px" } }}
        >
          <TableHead>
            <TableRow>
              {headers.map((header, key) => (
                <TableCell key={key}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product, key) => (
                <CartTableRow key={key} product={product} />
              ))}
          </TableBody>
          <TableBody>
            <TableRow sx={{ "& td": { fontWeight: "bold", fontSize: "18px" } }}>
              <TableCell sx={{textAlign: "center"}}>Total</TableCell>
              <TableCell>{totalItems} Items</TableCell>
              <TableCell>${roundPrice(totalPrice)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

const roundPrice = (price) =>
  Math.round(price * Math.pow(10, 2)) / Math.pow(10, 2);

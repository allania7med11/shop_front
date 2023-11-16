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
  const price =
    Math.round(product.current_price * product.cart_item.quantity * Math.pow(10, 5)) /
    Math.pow(10, 5);
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
  const { data: productsApi = [] } = useProductsQuery(
    { id_in: product_ids },
    {
      skip: product_ids.length === 0,
    }
  );
  const products = addItemsToProducts(productsApi, items);

  // Pagination state
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5); // Set the number of rows per page

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer>
        <Table aria-label="simple table" sx={{ "& td": { padding: "12px 4px" } }}>
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

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { ProductQuantity } from '@/components/common/productQuantity';
import { ProductTableCell } from './productTableCell';
import { IsCartItem, IsCartItemRead } from '@/data/cart';

export const CartTableRow: React.FC<{ item: IsCartItemRead }> = ({ item }) => {
  const cart_item: IsCartItem = {
    id: item.id,
    product: item.product.id,
    quantity: item.quantity,
  };
  return (
    <TableRow>
      <TableCell>
        <ProductTableCell item={item} />
      </TableCell>
      <TableCell>
        <ProductQuantity cart_item={cart_item} />
      </TableCell>
      <TableCell>${item.subtotal}</TableCell>
    </TableRow>
  );
};

export const CartTable: React.FC<{ items: IsCartItemRead[]; total_amount: string }> = ({
  items,
  total_amount,
}) => {
  const headers = ['Name', 'Quantity', 'Price'];

  // Pagination state
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate total items and total price
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = total_amount;

  return (
    <Paper>
      <TableContainer>
        <Table aria-label="simple table" sx={{ '& td': { padding: '12px 4px' } }}>
          <TableHead>
            <TableRow>
              {headers.map((header, key) => (
                <TableCell key={key}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, key) => (
              <CartTableRow key={key} item={item} />
            ))}
          </TableBody>
          <TableBody>
            <TableRow sx={{ '& td': { fontWeight: 'bold', fontSize: '18px' } }}>
              <TableCell sx={{ textAlign: 'center' }}>Total</TableCell>
              <TableCell>{totalItems} Items</TableCell>
              <TableCell>${roundPrice(totalPrice)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

const roundPrice = price => Math.round(price * Math.pow(10, 2)) / Math.pow(10, 2);

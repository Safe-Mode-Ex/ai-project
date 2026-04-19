import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { CartItem } from '../CartItem/CartItem';

export function CartTable({ items, onRemoveItem, onDecreaseQuantity, onIncreaseQuantity }) {
  return (
    <Paper elevation={3}>
      <Table>
        <TableHead
          sx={{
            '& .MuiTableCell-root': {
              fontWeight: 700,
            },
          }}
        >
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell align="right">Цена</TableCell>
            <TableCell align="center">Количество</TableCell>
            <TableCell align="right">Сумма</TableCell>
            <TableCell align="center">Удалить</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.length > 0 ? (
            items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={onRemoveItem}
                onDecreaseQuantity={onDecreaseQuantity}
                onIncreaseQuantity={onIncreaseQuantity}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                В корзине пока нет товаров
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}

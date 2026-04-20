import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { CartItem } from '../CartItem/CartItem';

/**
 * @typedef {Object} CartItemType
 * @property {number} id - Уникальный идентификатор товара
 * @property {string} name - Название товара
 * @property {number} price - Базовая цена товара в рублях
 * @property {number} [discount] - Размер скидки в процентах (опционально)
 * @property {string} image - URL изображения товара
 * @property {number} quantity - Количество товара в корзине
 */

/**
 * @typedef {Object} CartTableProps
 * @property {CartItemType[]} items - Массив товаров в корзине
 * @property {(id: number) => void} onRemoveItem - Callback для удаления товара из корзины
 * @property {(id: number) => void} onDecreaseQuantity - Callback для уменьшения количества товара
 * @property {(id: number) => void} onIncreaseQuantity - Callback для увеличения количества товара
 */

/**
 * Компонент таблицы корзины, отображающий список товаров с заголовками и колонками.
 *
 * @param {CartTableProps} props
 * @returns {JSX.Element}
 */
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

import { memo } from 'react';
import { IconButton, TableCell, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { getUnitPrice } from '../../utils/price';
import './CartItem.css';

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
 * @typedef {Object} CartItemProps
 * @property {CartItemType} item - Объект товара в корзине
 * @property {(id: number) => void} onRemove - Callback для удаления товара из корзины
 * @property {(id: number) => void} onDecreaseQuantity - Callback для уменьшения количества товара
 * @property {(id: number) => void} onIncreaseQuantity - Callback для увеличения количества товара
 */

/**
 * Компонент строки таблицы для отображения товара в корзине.
 * Отображает информацию о товаре, цену (с учётом скидки), количество и кнопки управления.
 *
 * @param {CartItemProps} props
 * @returns {JSX.Element}
 */
export const CartItem = memo(({ item, onRemove, onDecreaseQuantity, onIncreaseQuantity }) => {
  const hasDiscount = (item.discount ?? 0) > 0;
  const unitPrice = getUnitPrice(item);
  const linePrice = unitPrice * item.quantity;

  return (
    <TableRow className="cart-item">
      <TableCell className="cart-item__cell">
        <div className="cart-item__product">
          <img className="cart-item__thumbnail" src={item.image} alt={item.name} loading="lazy" />
          <span>{item.name}</span>
        </div>
      </TableCell>
      <TableCell className="cart-item__cell" align="right">
        <div className="cart-item__price-wrap">
          {hasDiscount && (
            <span className="cart-item__price-old">
              {item.price.toLocaleString('ru-RU')} ₽
            </span>
          )}
          <span>{unitPrice.toLocaleString('ru-RU')} ₽</span>
          {hasDiscount && <span className="cart-item__discount">-{item.discount}%</span>}
        </div>
      </TableCell>
      <TableCell className="cart-item__cell" align="center">
        <div className="cart-item__quantity">
          <IconButton aria-label={`Уменьшить количество ${item.name}`} onClick={() => onDecreaseQuantity(item.id)} size="small">
            <RemoveIcon fontSize="small" />
          </IconButton>
          <span className="cart-item__quantity-value">{item.quantity}</span>
          <IconButton aria-label={`Увеличить количество ${item.name}`} onClick={() => onIncreaseQuantity(item.id)} size="small">
            <AddIcon fontSize="small" />
          </IconButton>
        </div>
      </TableCell>
      <TableCell className="cart-item__cell" align="right">
        {linePrice.toLocaleString('ru-RU')} ₽
      </TableCell>
      <TableCell className="cart-item__cell" align="center">
        <IconButton color="error" aria-label={`Удалить ${item.name}`} onClick={() => onRemove(item.id)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
});

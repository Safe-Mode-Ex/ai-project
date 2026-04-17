import { IconButton, TableCell, TableRow } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import './CartItem.css'

function CartItem({ item, onRemove, onDecreaseQuantity, onIncreaseQuantity }) {
  const linePrice = item.price * item.quantity

  return (
    <TableRow className="cart-item">
      <TableCell>{item.name}</TableCell>
      <TableCell align="right">{item.price.toLocaleString('ru-RU')} ₽</TableCell>
      <TableCell align="center">
        <div className="cart-item__quantity">
          <IconButton aria-label={`Уменьшить количество ${item.name}`} onClick={() => onDecreaseQuantity(item.id)} size="small">
            <RemoveIcon fontSize="small" />
          </IconButton>
          <span>{item.quantity}</span>
          <IconButton aria-label={`Увеличить количество ${item.name}`} onClick={() => onIncreaseQuantity(item.id)} size="small">
            <AddIcon fontSize="small" />
          </IconButton>
        </div>
      </TableCell>
      <TableCell align="right">{linePrice.toLocaleString('ru-RU')} ₽</TableCell>
      <TableCell align="center">
        <IconButton color="error" aria-label={`Удалить ${item.name}`} onClick={() => onRemove(item.id)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default CartItem

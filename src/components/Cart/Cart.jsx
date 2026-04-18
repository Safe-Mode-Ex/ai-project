import { Container, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { getUnitPrice } from '../../utils/price'
import CartItem from '../CartItem/CartItem'
import './Cart.css'

function Cart({ items, onRemoveItem, onDecreaseQuantity, onIncreaseQuantity }) {
  const totalPrice = items.reduce((total, item) => total + getUnitPrice(item) * item.quantity, 0)

  return (
    <main className="cart-page">
      <Container maxWidth="lg" className="cart-page__container">
        <Typography variant="h4" component="h1">
          Корзина
        </Typography>
        <Typography variant="h6" color="primary" className="cart-page__total">
          Общая стоимость: {totalPrice.toLocaleString('ru-RU')} ₽
        </Typography>

        <Paper elevation={3}>
          <Table>
            <TableHead>
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
      </Container>
    </main>
  )
}

export default Cart

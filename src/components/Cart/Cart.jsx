import { useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { getUnitPrice } from '../../utils/price'
import CartItem from '../CartItem/CartItem'
import './Cart.css'

const PROMO_DISCOUNT_PERCENT = 15

function Cart({ items, isPromoApplied, onRemoveItem, onDecreaseQuantity, onIncreaseQuantity, onApplyPromoCode }) {
  const [promoCode, setPromoCode] = useState('')
  const [promoStatus, setPromoStatus] = useState('idle')
  const totalPrice = items.reduce((total, item) => total + getUnitPrice(item) * item.quantity, 0)
  const discountAmount = isPromoApplied ? totalPrice * (PROMO_DISCOUNT_PERCENT / 100) : 0
  const totalWithDiscount = totalPrice - discountAmount

  const handlePromoSubmit = () => {
    if (isPromoApplied) {
      return
    }

    const isApplied = onApplyPromoCode(promoCode.trim())

    if (isApplied) {
      setPromoStatus('success')
      return
    }

    setPromoStatus('error')
  }

  const currentPromoStatus = isPromoApplied ? 'success' : promoStatus
  const handlePromoFormSubmit = (event) => {
    event.preventDefault()
    handlePromoSubmit()
  }

  return (
    <main className="cart-page">
      <Container maxWidth="lg" className="cart-page__container">
        <Typography variant="h4" component="h1">
          Корзина
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
        <div className="cart-page__summary">
          <form className="cart-page__promo" onSubmit={handlePromoFormSubmit}>
            <div className="cart-page__promo-input-wrap">
              <TextField
                size="small"
                variant="filled"
                label="Промокод"
                value={promoCode}
                className="cart-page__promo-input"
                onChange={(event) => {
                  setPromoCode(event.target.value)
                  if (!isPromoApplied) {
                    setPromoStatus('idle')
                  }
                }}
                error={currentPromoStatus === 'error'}
                slotProps={{
                  htmlInput: {
                    readOnly: isPromoApplied,
                  },
                  input: {
                    className: 'cart-page__promo-input-control',
                    disableUnderline: true,
                  },
                }}
              />
              {currentPromoStatus === 'success' && <CheckCircleIcon className="cart-page__promo-icon cart-page__promo-icon_success" />}
              {currentPromoStatus === 'error' && <CancelIcon className="cart-page__promo-icon cart-page__promo-icon_error" />}
            </div>
            <Button className="cart-page__promo-button" variant="contained" type="submit" disabled={isPromoApplied}>
              Применить
            </Button>
          </form>
          <div className="cart-page__totals">
            <Typography variant="h6" color="primary" className="cart-page__total">
              {isPromoApplied ? 'Сумма без скидки' : 'Итоговая сумма'}: {totalPrice.toLocaleString('ru-RU')} ₽
            </Typography>
            {isPromoApplied && (
              <Typography variant="h6" color="primary" className="cart-page__total">
                Сумма со скидкой: {totalWithDiscount.toLocaleString('ru-RU')} ₽
              </Typography>
            )}
          </div>
        </div>
      </Container>
    </main>
  )
}

export default Cart

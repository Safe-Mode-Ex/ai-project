import { useCallback, useMemo, useState } from 'react'
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
import { CartItem } from '../../components/CartItem/CartItem'
import { PROMO_DISCOUNT_PERCENT } from '../../constants/cart'
import './CartPage.css'

export function CartPage({ items, isPromoApplied, onRemoveItem, onDecreaseQuantity, onIncreaseQuantity, onApplyPromoCode }) {
  const [promoCode, setPromoCode] = useState('')
  const [promoStatus, setPromoStatus] = useState('idle')

  const totalPrice = useMemo(() => items.reduce((total, item) => total + getUnitPrice(item) * item.quantity, 0), [items])
  const discountAmount = useMemo(
    () => (isPromoApplied ? totalPrice * (PROMO_DISCOUNT_PERCENT / 100) : 0),
    [isPromoApplied, totalPrice],
  )
  const totalWithDiscount = useMemo(() => totalPrice - discountAmount, [totalPrice, discountAmount])

  const handlePromoSubmit = useCallback(() => {
    if (isPromoApplied) {
      return
    }

    const isApplied = onApplyPromoCode(promoCode.trim())

    if (isApplied) {
      setPromoStatus('success')
      return
    }

    setPromoStatus('error')
  }, [isPromoApplied, onApplyPromoCode, promoCode])

  const currentPromoStatus = isPromoApplied ? 'success' : promoStatus
  const handlePromoFormSubmit = useCallback((event) => {
    event.preventDefault()
    handlePromoSubmit()
  }, [handlePromoSubmit])

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
                sx={{
                  '& .MuiFilledInput-root': {
                    height: 40,
                    backgroundColor: '#fff',
                    border: '1px solid rgba(0, 0, 0, 0.23)',
                    borderRight: 0,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 4,
                    boxSizing: 'border-box',
                    '&:hover': {
                      borderColor: 'rgba(0, 0, 0, 0.87)',
                    },
                    '&.Mui-focused': {
                      borderColor: '#1976d2',
                    },
                    '&.Mui-error': {
                      borderColor: '#d32f2f',
                    },
                    '&:before, &:after': {
                      display: 'none',
                    },
                  },
                  '& .MuiInputBase-input': {
                    paddingRight: '34px',
                  },
                  '& .MuiInputLabel-root': {
                    transform: 'translate(12px, 10px) scale(1)',
                  },
                  '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                    transform: 'translate(12px, 5px) scale(0.75)',
                  },
                }}
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
                    disableUnderline: true,
                  },
                }}
              />
              {currentPromoStatus === 'success' && <CheckCircleIcon className="cart-page__promo-icon cart-page__promo-icon_success" />}
              {currentPromoStatus === 'error' && <CancelIcon className="cart-page__promo-icon cart-page__promo-icon_error" />}
            </div>
            <Button
              variant="contained"
              type="submit"
              disabled={isPromoApplied}
              sx={{
                height: 40,
                minHeight: 40,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                boxShadow: 'none',
                '&:hover, &:active, &:focus': {
                  boxShadow: 'none',
                },
              }}
            >
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

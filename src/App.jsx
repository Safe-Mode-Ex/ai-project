import { Container, Typography } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import { useMemo, useState } from 'react'
import Header from './components/Header/Header'
import Cart from './components/Cart/Cart'
import LimitNotification from './components/LimitNotification/LimitNotification'
import ProductGrid from './components/ProductGrid/ProductGrid'
import products from './data/products'
import './App.css'

const MAX_PRODUCT_QUANTITY = 2

function App() {
  const [cart, setCart] = useState({
    items: [],
    isPromoApplied: false,
  })
  const [isLimitNotificationOpen, setIsLimitNotificationOpen] = useState(false)
  const [limitNotificationMessage, setLimitNotificationMessage] = useState('')

  const showLimitNotification = (productName) => {
    setLimitNotificationMessage(`Можно добавить не более ${MAX_PRODUCT_QUANTITY} шт. товара "${productName}".`)
    setIsLimitNotificationOpen(true)
  }

  const handleCloseLimitNotification = () => {
    setIsLimitNotificationOpen(false)
  }

  const handleAddToCart = (product) => {
    const existingItem = cart.items.find((item) => item.id === product.id)

    if (existingItem && existingItem.quantity >= MAX_PRODUCT_QUANTITY) {
      showLimitNotification(product.name)
      return
    }

    setCart((prevCart) => {
      const productInCart = prevCart.items.find((item) => item.id === product.id)

      if (productInCart) {
        return {
          ...prevCart,
          items: prevCart.items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)),
        }
      }

      return {
        ...prevCart,
        items: [...prevCart.items, { ...product, quantity: 1 }],
      }
    })
  }

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.filter((item) => item.id !== productId),
    }))
  }

  const handleDecreaseQuantity = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items
        .map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    }))
  }

  const handleIncreaseQuantity = (productId) => {
    const itemInCart = cart.items.find((item) => item.id === productId)

    if (itemInCart && itemInCart.quantity >= MAX_PRODUCT_QUANTITY) {
      showLimitNotification(itemInCart.name)
      return
    }

    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item)),
    }))
  }

  const handleApplyPromoCode = (promoCode) => {
    if (cart.isPromoApplied || promoCode !== 'Кекс') {
      return false
    }

    setCart((prevCart) => ({
      ...prevCart,
      isPromoApplied: true,
    }))

    return true
  }

  const cartCount = useMemo(
    () => cart.items.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0),
    [cart.items],
  )

  return (
    <>
      <Header cartCount={cartCount} />
      <LimitNotification
        open={isLimitNotificationOpen}
        message={limitNotificationMessage}
        onClose={handleCloseLimitNotification}
      />
      <Routes>
        <Route
          path="/"
          element={
            <main className="catalog-page">
              <Container maxWidth="xl" className="catalog-page__container">
                <Typography variant="h3" component="h1" className="catalog-page__title">
                  Каталог товаров
                </Typography>
                <ProductGrid products={products} onAddToCart={handleAddToCart} />
              </Container>
            </main>
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              items={cart.items}
              isPromoApplied={cart.isPromoApplied}
              onRemoveItem={handleRemoveFromCart}
              onDecreaseQuantity={handleDecreaseQuantity}
              onIncreaseQuantity={handleIncreaseQuantity}
              onApplyPromoCode={handleApplyPromoCode}
            />
          }
        />
      </Routes>
    </>
  )
}

export default App

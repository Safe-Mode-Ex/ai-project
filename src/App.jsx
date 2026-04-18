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
  const [cartItems, setCartItems] = useState([])
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
    const existingItem = cartItems.find((item) => item.id === product.id)

    if (existingItem && existingItem.quantity >= MAX_PRODUCT_QUANTITY) {
      showLimitNotification(product.name)
      return
    }

    setCartItems((prevItems) => {
      const productInCart = prevItems.find((item) => item.id === product.id)

      if (productInCart) {
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }

      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const handleDecreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const handleIncreaseQuantity = (productId) => {
    const itemInCart = cartItems.find((item) => item.id === productId)

    if (itemInCart && itemInCart.quantity >= MAX_PRODUCT_QUANTITY) {
      showLimitNotification(itemInCart.name)
      return
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item)),
    )
  }

  const cartCount = useMemo(
    () => cartItems.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0),
    [cartItems],
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
              items={cartItems}
              onRemoveItem={handleRemoveFromCart}
              onDecreaseQuantity={handleDecreaseQuantity}
              onIncreaseQuantity={handleIncreaseQuantity}
            />
          }
        />
      </Routes>
    </>
  )
}

export default App

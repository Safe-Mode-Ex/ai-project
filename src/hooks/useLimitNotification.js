import { useCallback, useState } from 'react'
import { getLimitMessage } from '../utils/cart'

export function useLimitNotification(maxProductQuantity) {
  const [isLimitNotificationOpen, setIsLimitNotificationOpen] = useState(false)
  const [limitNotificationMessage, setLimitNotificationMessage] = useState('')

  const showLimitNotification = useCallback((productName) => {
    setLimitNotificationMessage(getLimitMessage(productName, maxProductQuantity))
    setIsLimitNotificationOpen(true)
  }, [maxProductQuantity])

  const handleCloseLimitNotification = useCallback(() => {
    setIsLimitNotificationOpen(false)
  }, [])

  return {
    isLimitNotificationOpen,
    limitNotificationMessage,
    showLimitNotification,
    handleCloseLimitNotification,
  }
}

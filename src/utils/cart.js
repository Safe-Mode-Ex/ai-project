export const getCartCount = (items) => items.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0)

export const getLimitMessage = (productName, maxProductQuantity) =>
  `Можно добавить не более ${maxProductQuantity} шт. товара "${productName}".`

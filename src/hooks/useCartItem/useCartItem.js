import { useMemo } from 'react';

/**
 * Hook for finding a cart item by product ID
 * @param {Array} cartItems - Items in cart
 * @param {string|number} productId - Product ID to find
 * @returns {{ item: Object|undefined, quantity: number }}
 */
export function useCartItem(cartItems, productId) {
  const numericId = Number(productId);

  const item = useMemo(
    () => cartItems.find((cartItem) => cartItem.id === numericId),
    [cartItems, numericId]
  );

  return {
    item,
    quantity: item?.quantity ?? 0,
  };
}

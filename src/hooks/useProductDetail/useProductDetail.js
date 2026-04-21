import { useMemo } from 'react';
import productsDetail from '../data/productsDetail';
import products from '../data/products';

/**
 * Hook for fetching product details and related products
 * @param {string|number} productId - Product ID from URL params
 * @returns {{ product: Object|null, baseProduct: Object|null, relatedProducts: Array, isNotFound: boolean }}
 */
export function useProductDetail(productId) {
  const numericId = Number(productId);

  const product = useMemo(
    () => productsDetail.find((p) => p.id === numericId),
    [numericId]
  );

  const baseProduct = useMemo(
    () => products.find((p) => p.id === numericId),
    [numericId]
  );

  const relatedProducts = useMemo(() => {
    const otherProducts = products.filter((p) => p.id !== numericId);
    const shuffled = [...otherProducts].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  }, [numericId]);

  return {
    product,
    baseProduct,
    relatedProducts,
    isNotFound: !product,
  };
}

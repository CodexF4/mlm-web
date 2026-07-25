export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  sold: number;
  /** Optional discount percentage (0–100). */
  discount?: number;
}

export function unitPrice(product: Product): number {
  return product.discount ? Math.round(product.price * (1 - product.discount / 100)) : product.price;
}

export function formatPeso(value: number): string {
  return '₱' + value.toLocaleString('en-PH');
}

export interface Product {
  id: string;
  /** Available count */
  count: number;
  description: string;
  price: number;
  minAge: number;
  company: string;
  title: string;
}

export interface ProductCheckout extends Product {
  orderedCount: number;
  /** orderedCount * price */
  totalPrice: number;
}

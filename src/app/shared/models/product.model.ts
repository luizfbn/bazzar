export interface Product {
  id: string;
  name: string;
  active: boolean;
  description: string;
  images: string[];
  price: number;
  defaultPrice: string;
  currency: string;
}

export interface ProductCheckout {
  price: string;
  quantity: number;
}

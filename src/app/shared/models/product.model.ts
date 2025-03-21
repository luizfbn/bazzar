export interface IProduct {
  id: string;
  name: string;
  active: boolean;
  description: string;
  images: string[];
  price: number;
  defaultPrice: string;
  currency: string;
}

export interface IProductCheckout {
  price: string;
  quantity: number;
}

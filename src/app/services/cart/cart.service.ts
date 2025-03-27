import { effect, Injectable, signal } from '@angular/core';
import { IProduct } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<IProduct[]>([]);

  setCart(products: IProduct[]) {
    this.cart.set(products);
  }

  addProduct(product: IProduct) {
    const hasProduct = this.cart().some(
      (cartProduct) => cartProduct.id === product.id
    );
    if (!hasProduct) {
      this.cart.update((cart) => [...cart, product]);
    }
  }

  removeProduct(product: IProduct) {
    this.cart.update((cart) =>
      cart.filter((cartProduct) => cartProduct.id !== product.id)
    );
  }

  constructor() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.setCart(JSON.parse(savedCart));
    }
    effect(() => {
      const cart = this.cart();
      localStorage.setItem('cart', JSON.stringify(cart));
    });
  }
}

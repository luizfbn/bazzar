import { Component, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../services/cart/cart.service';
import { PaymentService } from '../../../services/payment/payment.service';
import { IProduct } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  isPurchaseBtnDisabled = false;
  totalPrice = computed(() => {
    return this.cartService.cart().reduce((prev, { price }) => prev + price, 0);
  });

  constructor(
    public cartService: CartService,
    private paymentService: PaymentService
  ) {}

  completePurchase(products: IProduct[]) {
    const productsCheckout = this.formatProductsForCheckout(products);
    this.isPurchaseBtnDisabled = true;
    this.paymentService.createPaymentCheckout(productsCheckout).subscribe({
      next: (url) => (window.location.href = url),
      error: () => (this.isPurchaseBtnDisabled = false),
      complete: () => (this.isPurchaseBtnDisabled = false),
    });
  }

  formatProductsForCheckout(products: IProduct[]) {
    return products.map((product) => {
      return {
        price: product.defaultPrice,
        quantity: 1,
      };
    });
  }
}

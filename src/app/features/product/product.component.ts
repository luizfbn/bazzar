import { Component, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { ShowMoreComponent } from './components/show-more/show-more.component';
import { ProductService } from '../../services/product/product.service';
import { PaymentService } from '../../services/payment/payment.service';
import { IProduct } from '../../shared/models/product.model';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-product',
  imports: [LoadingComponent, CurrencyPipe, ShowMoreComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  product: IProduct | null = null;
  isLoading = false;
  isBuyNowBtnDisabled = false;
  isProductInCart = computed(() => {
    return this.product
      ? this.cartService
          .cart()
          .some((cartProduct) => cartProduct.id === this.product!.id)
      : false;
  });

  constructor(
    private productService: ProductService,
    private paymentService: PaymentService,
    private cartService: CartService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.isLoading = true;
      this.productService.getProductById(productId).subscribe({
        next: (product) => (this.product = product),
        error: () => (this.isLoading = false),
        complete: () => (this.isLoading = false),
      });
    }
  }

  addToCart(product: IProduct) {
    this.cartService.addProduct(product);
  }

  buyNow(product: IProduct) {
    this.isBuyNowBtnDisabled = true;
    this.paymentService
      .createPaymentCheckout([
        {
          price: product.defaultPrice,
          quantity: 1,
        },
      ])
      .subscribe({
        next: (url) => (window.location.href = url),
        error: () => (this.isBuyNowBtnDisabled = false),
        complete: () => (this.isBuyNowBtnDisabled = false),
      });
  }
}

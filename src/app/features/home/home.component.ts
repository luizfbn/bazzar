import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { ProductService } from '../../services/product/product.service';
import { IProduct } from '../../shared/models/product.model';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent, RouterLink, CurrencyPipe, LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products: IProduct[] = [];
  isLoading = false;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (products) => (this.products = products),
      error: () => (this.isLoading = false),
      complete: () => (this.isLoading = false),
    });
  }
}

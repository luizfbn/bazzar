import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../shared/models/product.model';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent, RouterLink, CurrencyPipe, LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products: IProduct[] = [];
  loading = false;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products) => (this.products = products),
      error: () => (this.loading = false),
      complete: () => (this.loading = false),
    });
  }
}

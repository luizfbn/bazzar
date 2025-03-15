import { Component } from '@angular/core';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}

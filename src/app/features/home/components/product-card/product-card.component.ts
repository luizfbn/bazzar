import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input({ required: true }) title!: string;
  @Input() subtitle: string = '';
  @Input({ required: true }) img!: string;
  @Input() alt: string = '';
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'show-more',
  imports: [],
  templateUrl: './show-more.component.html',
  styleUrl: './show-more.component.css',
})
export class ShowMoreComponent {
  @Input({ required: true }) text!: string;
  @Input({ required: true }) length!: number;
  showMore = false;

  handleClick() {
    this.showMore = !this.showMore;
  }
}

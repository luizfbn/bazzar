import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { PaymentService } from '../../services/payment/payment.service';
import { CartService } from '../../services/cart/cart.service';
import { ICustomer } from '../../shared/models/customer.model';

@Component({
  selector: 'app-payment-success',
  imports: [LoadingComponent, RouterLink],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css',
})
export class PaymentSuccessComponent {
  isLoading = false;
  customer: ICustomer | null = null;

  constructor(
    private paymentService: PaymentService,
    private cartService: CartService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit() {
    const sessionId = this.route.snapshot.queryParamMap.get('session_id')!;
    this.getPaymentStatus(sessionId);
  }

  getPaymentStatus(sessionId: string) {
    this.isLoading = true;
    this.paymentService.getPaymentStatus(sessionId).subscribe({
      next: (customer) => {
        this.customer = customer;
        this.cartService.setCart([]);
      },
      error: () => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      complete: () => (this.isLoading = false),
    });
  }
}

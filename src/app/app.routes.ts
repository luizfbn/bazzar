import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductComponent } from './features/product/product.component';
import { PaymentSuccessComponent } from './features/payment-success/payment-success.component';
import { paymentSuccessGuard } from './guards/payment-success.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products/:id', component: ProductComponent },
  {
    path: 'success',
    component: PaymentSuccessComponent,
    canActivate: [paymentSuccessGuard],
  },
];

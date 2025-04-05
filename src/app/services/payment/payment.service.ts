import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IProductCheckout } from '../../shared/models/product.model';
import { ICustomer } from '../../shared/models/customer.model';
import { handleError } from '../../shared/utils/handle-error';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  createPaymentCheckout(products: IProductCheckout[]) {
    return this.httpClient
      .post<string>(`${this.url}/payment/checkout`, JSON.stringify(products), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        responseType: 'text' as 'json',
      })
      .pipe(retry(2), catchError(handleError));
  }

  getPaymentStatus(sessionId: string) {
    return this.httpClient
      .get<ICustomer>(`${this.url}/payment/status`, {
        params: {
          session_id: sessionId,
        },
      })
      .pipe(retry(2), catchError(handleError));
  }
}

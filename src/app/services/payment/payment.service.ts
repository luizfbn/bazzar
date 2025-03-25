import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IProductCheckout } from '../../shared/models/product.model';
import { ICustomer } from '../../shared/models/customer.model';

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
      .pipe(retry(2), catchError(this.handleError));
  }

  getPaymentStatus(sessionId: string) {
    return this.httpClient
      .get<ICustomer>(`${this.url}/payment/status`, {
        params: {
          session_id: sessionId,
        },
      })
      .pipe(retry(2), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // client side
    if (error.error instanceof ErrorEvent) {
      console.error('Client error:', error.error.message);
      return throwError(
        () => new Error(`Client error: ${error.error.message}`)
      );
    }
    // server side
    console.error(`Server error: ${error.status} - ${error.message}`);
    return throwError(
      () => new Error(`Error ${error.status} - ${error.message}`)
    );
  }
}

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { IProduct, IProductCheckout } from '../shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getProducts() {
    return this.httpClient
      .get<IProduct[]>(`${this.url}/products`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getProductById(id: string) {
    return this.httpClient
      .get<IProduct>(`${this.url}/products/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  checkoutProduct(products: IProductCheckout[]) {
    return this.httpClient
      .post<string>(`${this.url}/checkout`, JSON.stringify(products), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        responseType: 'text' as 'json',
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

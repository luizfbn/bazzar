import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product, ProductCheckout } from '../shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getProducts() {
    return this.httpClient
      .get<Product[]>(`${this.url}/products`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getProductById(id: string) {
    return this.httpClient
      .get<Product>(`${this.url}/products/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  checkoutProduct(products: ProductCheckout[]) {
    return this.httpClient
      .post<string>(this.url, JSON.stringify(products), {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(retry(2), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // client side
    if (error.error instanceof ErrorEvent) {
      return throwError(() => new Error(error.error.message));
    }
    // server side
    return throwError(
      () => new Error(`Error ${error.status} - ${error.message}`)
    );
  }
}

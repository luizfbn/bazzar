import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IProduct } from '../../shared/models/product.model';
import { handleError } from '../../shared/utils/handle-error';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getProducts() {
    return this.httpClient
      .get<IProduct[]>(`${this.url}/products`)
      .pipe(retry(2), catchError(handleError));
  }

  getProductById(id: string) {
    return this.httpClient
      .get<IProduct>(`${this.url}/products/${id}`)
      .pipe(retry(2), catchError(handleError));
  }
}

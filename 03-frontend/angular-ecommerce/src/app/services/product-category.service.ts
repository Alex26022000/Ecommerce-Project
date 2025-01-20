import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private apiUrl = 'http://localhost:8081/api/product-category'; // URL-ul endpoint-ului pentru categorii

  constructor(private http: HttpClient) {}

  getCategories(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(this.apiUrl);
  }
}

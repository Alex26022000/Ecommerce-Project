import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8081/api/products';
  private categoryUrl = 'http://localhost:8081/api/product-category';

  constructor(private httpClient: HttpClient) {}

  getProduct(productId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl);
  }
 
  getProductListPaginate(
    thePage: number,
    thePageSize: number,
    theCategoryId?: number,
    sortField: string = 'name', 
    sortDirection: string = 'asc' 
  ): Observable<GetResponseProducts> {
    let params = new HttpParams()
      .set('page', thePage.toString())
      .set('size', thePageSize.toString())
      .set('sort', `${sortField},${sortDirection}`); 
  
    if (theCategoryId != null) {
      params = params.set('categoryId', theCategoryId.toString());
    }
  
    return this.httpClient.get<GetResponseProducts>(this.baseUrl, { params });
  }
  
  
  searchProductsPaginate(
    thePage: number,
    thePageSize: number,
    theKeyword: string
  ): Observable<GetResponseProducts> {
    let params = new HttpParams()
      .set('name', theKeyword)   // Cuvântul cheie pentru căutare
      .set('page', thePage.toString())  // Numărul paginii
      .set('size', thePageSize.toString());  // Dimensiunea paginii
  
    const searchUrl = `${this.baseUrl}/search/by-name`;  // URL-ul corect
    console.log('Search URL:', searchUrl, 'Params:', params.toString()); // Verifică URL-ul generat
  
    return this.httpClient.get<GetResponseProducts>(searchUrl, { params });
  }
  

  getProducts(
    page: number,
    pageSize: number,
    categoryId?: number,
    keyword?: string
  ): Observable<GetResponseProducts> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', pageSize.toString());
  
    if (categoryId) {
      params = params.set('categoryId', categoryId.toString());
    }
    if (keyword) {
      params = params.set('name', keyword);
    }
  
    return this.httpClient.get<GetResponseProducts>(this.baseUrl, { params });
  }
  

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(this.categoryUrl);
  }
  

  addProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.baseUrl, product);
  }

  deleteProduct(productId: number): Observable<void> {
    const deleteUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.delete<void>(deleteUrl);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    const updateUrl = `${this.baseUrl}/${id}`;
    return this.httpClient.put<Product>(updateUrl, product);
  }

  addCategory(category: ProductCategory): Observable<ProductCategory> {
    return this.httpClient.post<ProductCategory>(this.categoryUrl, category);
  }
}

interface GetResponseProducts {
  content: Product[];
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/';

  constructor(private http: HttpClient) { }

  // Fetch all products
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'products');
  }

  // Fetch products by page
  getProductsByPage(offset: number, limit: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'products?offset=' + offset + '&limit=' + limit);
  }

  // Fetch products categories
  getProductCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'categories');
  }

  // Fetch products by category ID
  getProductByCategoryId(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'products?categoryId=' + id);
  }

  // Fetch product by ID
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'products/' + id);
  }

  // Fetch products by price range
  getProductsByPriceRange(minPrice: number, maxPrice: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}products?price_min=${minPrice}&price_max=${maxPrice}`);
  }

  // Fetch product by title
  getProductByTitle(title: String): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'products/?title=' + title);
  }

}

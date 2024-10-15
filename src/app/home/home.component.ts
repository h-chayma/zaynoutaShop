import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products: any[] = [];
  shoes: any[] = [];
  electronics: any[] = [];
  isLoading: boolean = true;
  product1: any;
  product2: any;
  product3: any;
  product4: any;
  product5: any;
  product6: any;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getProductsByCategory();
    this.getTrendyProducts();
  }

  getProducts() {
    this.isLoading = true;
    this.productService.getProductsByPage(0, 4).subscribe((data) => {
      this.products = data;
      this.isLoading = false;
    });
  }

  getTrendyProducts() {
    this.isLoading = true;
    forkJoin([
      this.productService.getProductById(41),
      this.productService.getProductById(27),
      this.productService.getProductById(24),
      this.productService.getProductById(12),
      this.productService.getProductById(28),
      this.productService.getProductById(24)
    ]).subscribe(
      ([prod1, prod2, prod3, prod4, prod5, prod6]) => {
        this.product1 = prod1;
        this.product2 = prod2;
        this.product3 = prod3;
        this.product4 = prod4;
        this.product5 = prod5;
        this.product6 = prod6;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading trendy products', error);
        this.isLoading = false;
      }
    );
  }

  getProductsByCategory() {
    this.isLoading = true;
    forkJoin([
      this.productService.getProductByCategoryId(4),
      this.productService.getProductByCategoryId(2)
    ]).subscribe(
      ([shoes, electronics]) => {
        this.shoes = shoes;
        this.electronics = electronics;
        this.isLoading = false; 
      },
      (error) => {
        console.error('Error loading products by category', error);
        this.isLoading = false; 
      }
    );
  }
}


import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products: any[] = [];
  shoes: any[] = [];
  electronics: any[] = [];
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
    this.productService.getProductsByPage(0, 4).subscribe((data) => {
      this.products = data;
    });
  }

  getTrendyProducts() {
    this.productService.getProductById(41).subscribe((data) => {
      this.product1 = data;
    });
    this.productService.getProductById(27).subscribe((data) => {
      this.product2 = data;
    });
    this.productService.getProductById(24).subscribe((data) => {
      this.product3 = data;
    });
    this.productService.getProductById(12).subscribe((data) => {
      this.product4 = data;
    });
    this.productService.getProductById(28).subscribe((data) => {
      this.product5 = data;
    });
    this.productService.getProductById(24).subscribe((data) => {
      this.product6 = data;
    });
  }

  getProductsByCategory() {
    this.productService.getProductByCategoryId(4).subscribe((data) => {
      this.shoes = data;
    });

    this.productService.getProductByCategoryId(2).subscribe((data) => {
      this.electronics = data;
    });
  }
}


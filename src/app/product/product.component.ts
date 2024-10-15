import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  product: any;
  products: any[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? 0;
    this.getProductDetails(+id);
  }

  getProductDetails(id: number) {
    this.productService.getProductById(id).subscribe((data) => {
      this.product = data;
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}

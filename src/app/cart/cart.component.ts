import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: any[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.cartItems = this.cartService.getCartItems().map(item => {
      return {
        ...item,
        quantity: 1
      };
    });
  }

  calculateTotalByProduct(item: any): number {
    return item.price * item.quantity;
  }

  calculateSubtotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  calculateTotal(): number {
    const shipping = 0;
    return this.calculateSubtotal() + shipping;
  }

  loadCartItems() {
    this.cartItems = this.cartService.getCartItems();
  }

  removeCartItem(product: any) {
    this.cartService.removeItem(product);
    this.loadCartItems(); 
  }
}


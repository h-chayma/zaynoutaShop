import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);

  addToCart(product: any) {
    this.cart.push(product);
    this.cartItemCount.next(this.cart.length);
    console.log('Product added to cart:', product);
  }

  getCartItems() {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
  }

  removeItem(product: any) {
    const index = this.cart.findIndex(item => item.id === product.id);
    if (index > -1) {
      this.cart.splice(index, 1);
    }
  }

  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }
}
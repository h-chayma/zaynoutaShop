import { Component, EventEmitter, Output } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  cartItemCount: number = 0;
  showSearch = false;
  product: string = '';

  @Output() productSearched: EventEmitter<string> = new EventEmitter<string>();

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });
  }

  openSearchModal() {
    this.showSearch = true;
    $('#searchModal').modal('show');
  }

  closeSearchModal() {
    this.showSearch = false;
    $('#searchModal').modal('hide');
  }

  onSearch() {
    if (this.product.trim()) {
      console.log('Search term:', this.product);
      this.router.navigate(['/shop'], { queryParams: { search: this.product } });
      this.closeSearchModal(); 
    }
  }
}

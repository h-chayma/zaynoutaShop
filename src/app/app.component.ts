import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'zaynoutaLtd';
  searchedProduct: string = '';

  onProductSearched(product: string): void {
    console.log('Product searched:', product);
    this.searchedProduct = product;
  }
}

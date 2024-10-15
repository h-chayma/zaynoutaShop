import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  validCategoryNames: string[] = ['Clothes', 'Electronics', 'Shoes', 'Furniture', 'Miscellaneous'];
  product: string = '';

  currentPage: number = 1;
  productsPerPage: number = 12;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const categoryId = params['id'];
      if (categoryId) {
        this.getProductsByCategory(categoryId);
      } else {
        this.getProducts(this.currentPage);
      }
    });
    this.route.queryParams.subscribe((params) => {
      if (params['search']) {
        this.product = params['search'];
        console.log('Search query detected:', this.product);
        this.search();
      }
    });
    this.getCategories();
  }

  search() {
    if (this.product) {
      this.productService.getProductByTitle(this.product).subscribe(
        (data) => {
          this.products = data;
        },
        (error) => {
          console.error('Error fetching recipes:', error);
        }
      );
    }
  }

  getProducts(page: number) {
    const offset = (page - 1) * this.productsPerPage;
    this.productService.getProductsByPage(offset, this.productsPerPage).subscribe(data => {
      this.products = data;
      this.currentPage = page; 
    });
  }

  changePage(page: number) {
    if (page > 0 && page !== this.currentPage) {
      this.getProducts(page);
    }
  }

  getProductsByCategory(categoryId: number) {
    this.productService.getProductByCategoryId(categoryId).subscribe((data) => {
      this.products = data;
    });
  }

  getCategories() {
    this.productService.getProductCategories().subscribe((data) => {
      this.categories = data.filter(category =>
        this.validCategoryNames.includes(category.name)
      );
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  onSortChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    if (value === 'asc') {
      this.products.sort((a, b) => a.price - b.price);
    } else if (value === 'desc') {
      this.products.sort((a, b) => b.price - a.price);
    } else {
      this.getProducts(this.currentPage);
    }
  }

}
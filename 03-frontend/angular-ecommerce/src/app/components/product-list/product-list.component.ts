import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number | undefined = 1;
  previousCategoryId: number | undefined = 1;
  searchMode: boolean = false;

  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string = '';

  sortField: string = 'name'; 
  sortDirection: string = 'asc'; 


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  addToCart(theProduct: Product) {

    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    // TODO ... do the real work
    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);
  }



  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    if (this.previousKeyword !== theKeyword) {
      this.thePageNumber = 1;  // Resetăm pagina la 1 când cuvântul cheie se schimbă
    }

    this.previousKeyword = theKeyword;

    this.productService
      .searchProductsPaginate(this.thePageNumber - 1, this.thePageSize, theKeyword)
      .subscribe({
        next: (response) => {
          this.products = response.content;
          console.log('Products received:', this.products);
        },
        error: (err) => {
          console.error('Error occurred:', err);
          alert('A apărut o eroare la încărcarea produselor');
        }
      });
  }


  onCategorySelect(categoryId: number) {
    this.router.navigate(['/category', categoryId]);
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    this.currentCategoryId = hasCategoryId ? +this.route.snapshot.paramMap.get('id')! : undefined;
  
    if (this.previousCategoryId !== this.currentCategoryId) {
      this.thePageNumber = 1;
    }
  
    this.previousCategoryId = this.currentCategoryId;
  
    this.productService
      .getProductListPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        this.currentCategoryId,
        this.sortField,
        this.sortDirection
      )
      .subscribe((data) => {
        this.products = data.content;
        this.thePageNumber = data.number + 1;
        this.thePageSize = data.size;
        this.theTotalElements = data.totalElements;
      });
  }
  

  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  processResult() {
    return (data: any) => {
      this.products = data.content;
      this.thePageNumber = data.number + 1;
      this.thePageSize = data.size;
      this.theTotalElements = data.totalElements;
    };
  }

}

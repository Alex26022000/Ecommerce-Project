import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product = new Product();
  categories: ProductCategory[] = [];
  isEdit: boolean = false;
  originalProduct: Product = new Product();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
    this.loadCategories();
  }

  loadCategories() {
    this.productService.getProductCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  handleProductDetails() {
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(theProductId).subscribe((data) => {
      this.product = data;
      this.originalProduct = { ...data };
    });
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product.id).subscribe(
      () => {
        console.log("Product deleted successfully.");
        this.router.navigate(['/products']);
      },
      (error) => console.error('Error deleting product:', error)
    );
  }

  updateProduct() {
    this.productService.updateProduct(this.product.id, this.product).subscribe(
      () => {
        console.log("Product updated successfully.");
        this.isEdit = false;
      },
      (error) => console.error('Error updating product:', error)
    );
  }

  toggleEdit() {
    this.isEdit = true;
  }

  cancelEdit() {
    this.product = { ...this.originalProduct };
    this.isEdit = false;
  }

  addToCart(theProduct: Product) {

    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);
  }
}

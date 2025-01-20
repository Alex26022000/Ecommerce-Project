import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: Product = new Product();
  categories: ProductCategory[] = [];
  editMode: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private productCategoryService: ProductCategoryService,
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.editMode = true;
      this.productService.getProduct(+productId).subscribe(
        data => {
          this.product = data;
        },
        error => console.error(error)
      );
    }

    this.productCategoryService.getCategories().subscribe(
      data => this.categories = data,
      error => console.error(error)
    );
  }

  onSubmit(): void {
    if (this.editMode) {
      this.productService.updateProduct(this.product.id, this.product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.addProduct(this.product).subscribe(() => {
        this.router.navigate(['/products']); 
      });
    }
  }
  
}

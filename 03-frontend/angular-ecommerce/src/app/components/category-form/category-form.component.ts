import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent {
  category: ProductCategory = new ProductCategory();

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  onSubmit(): void {
    console.log('Submitting category:', this.category); 
    this.productService.addCategory(this.category).subscribe(
      response => {
        console.log('Category added successfully:', response);
        this.router.navigate(['/products']);
      },
      error => {
        console.error('Error adding category:', error);
      }
    );
  }
  
}

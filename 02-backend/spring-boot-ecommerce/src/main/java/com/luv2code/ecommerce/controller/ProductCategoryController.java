package com.luv2code.ecommerce.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.luv2code.ecommerce.entity.ProductCategory;
import com.luv2code.ecommerce.service.ProductCategoryService;

@RestController
@RequestMapping("/api/product-category")
@CrossOrigin("http://localhost:4200")
public class ProductCategoryController {

    @Autowired
    private ProductCategoryService productCategoryService;

    @GetMapping
    public List<ProductCategory> getAllCategories() {
        return productCategoryService.getAllCategories();
    }

    
    @PostMapping
    public ResponseEntity<?> addCategory(@Validated @RequestBody ProductCategory category) {
        try {
            ProductCategory savedCategory = productCategoryService.saveCategory(category);
            return ResponseEntity.ok(savedCategory);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid category data: " + e.getMessage());
        }
    }
}

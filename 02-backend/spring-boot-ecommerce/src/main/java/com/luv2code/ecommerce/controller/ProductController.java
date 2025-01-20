package com.luv2code.ecommerce.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.luv2code.ecommerce.dao.CartRepository;
import com.luv2code.ecommerce.dao.ProductRepository;
import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.service.ProductCategoryService;
import com.luv2code.ecommerce.service.ProductService;

import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("http://localhost:4200")
public class ProductController {
    private ProductService productService;
    private ProductRepository productRepository;
    
    @Autowired
    public ProductController(ProductService productService, ProductRepository productRepository) {
        this.productService = productService;
        this.productRepository = productRepository;
    }

    @PostMapping
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        if (product.getCategory() != null) {
            Product savedProduct = productService.saveProduct(product);
            return ResponseEntity.ok(savedProduct);
        } else {
            return ResponseEntity.badRequest().body(null); 
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        Product product = productService.updateProduct(id, updatedProduct);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> product = productService.getProductById(id);
        return product.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public Page<Product> getProducts(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String name,
            Pageable pageable) {
        return productService.findProducts(categoryId, name, pageable);
    }

    @GetMapping("/search/by-name")
    public Page<Product> searchProductsByName(
            @RequestParam("name") String name,
            @RequestParam("page") int page,
            @RequestParam("size") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findByNameContainingIgnoreCase(name, pageable);
    }


}

package com.luv2code.ecommerce.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.luv2code.ecommerce.dao.ProductRepository;
import com.luv2code.ecommerce.entity.Product;

import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        return productRepository.findById(id).map(product -> {
            product.setName(updatedProduct.getName());
            product.setDescription(updatedProduct.getDescription());
            product.setUnitPrice(updatedProduct.getUnitPrice());
            product.setImageUrl(updatedProduct.getImageUrl());
            product.setActive(updatedProduct.isActive());
            product.setUnitsInStock(updatedProduct.getUnitsInStock());
            product.setCategory(updatedProduct.getCategory());
            return productRepository.save(product);
        }).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public Page<Product> findProducts(Long categoryId, String name, Pageable pageable) {
        if (categoryId != null && name != null) {
            return productRepository.findByCategoryIdAndNameContainingIgnoreCase(categoryId, name, pageable);
        } else if (categoryId != null) {
            return productRepository.findByCategoryId(categoryId, pageable);
        } else if (name != null) {
            return productRepository.findByNameContainingIgnoreCase(name, pageable);
        } else {
            return productRepository.findAll(pageable);
        }
    }
}

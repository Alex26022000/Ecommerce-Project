package com.luv2code.ecommerce.service;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.luv2code.ecommerce.dao.ProductCategoryRepository;
import com.luv2code.ecommerce.entity.ProductCategory;

@Service
public class ProductCategoryService {

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    public List<ProductCategory> getAllCategories() {
        return productCategoryRepository.findAll();
    }

    
    public ProductCategory saveCategory(ProductCategory category) {
        return productCategoryRepository.save(category);
    }
}

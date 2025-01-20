package com.luv2code.ecommerce.dao;



import org.springframework.data.jpa.repository.JpaRepository;

import com.luv2code.ecommerce.entity.Cart;


public interface CartItemRepository extends JpaRepository<Cart, Long> {
}

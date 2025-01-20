package com.luv2code.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luv2code.ecommerce.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);  
}
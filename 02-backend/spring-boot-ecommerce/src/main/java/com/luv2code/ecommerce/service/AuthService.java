package com.luv2code.ecommerce.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.luv2code.ecommerce.dao.UserRepository;
import com.luv2code.ecommerce.entity.LoginRequest;
import com.luv2code.ecommerce.entity.User;


@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public String login(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail());
        
        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
            return "Login successful!";
        } else {
            return "Invalid credentials";
        }
    }
}

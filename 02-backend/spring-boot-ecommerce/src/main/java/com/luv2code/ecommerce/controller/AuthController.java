package com.luv2code.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.luv2code.ecommerce.entity.LoginRequest;
import com.luv2code.ecommerce.entity.ResponseMessage;
import com.luv2code.ecommerce.service.AuthService;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest loginRequest) {
        String result = authService.login(loginRequest);
        
        if ("Login successful!".equals(result)) {
            return ResponseEntity.ok().body(new ResponseMessage("Login successful!"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseMessage("Invalid credentials"));
        }
    }
}

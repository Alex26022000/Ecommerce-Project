package com.luv2code.ecommerce.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.luv2code.ecommerce.dao.CartRepository;
import com.luv2code.ecommerce.dao.ProductRepository;
import com.luv2code.ecommerce.entity.Cart;
import com.luv2code.ecommerce.entity.CartItem;
import com.luv2code.ecommerce.entity.Product;

import java.math.BigDecimal;
@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    public Cart getCart(Long cartId) {
        return cartRepository.findById(cartId).orElseGet(Cart::new);
    }

    public Cart addProductToCart(Long cartId, Long productId, int quantity) {
        Cart cart = getCart(cartId);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem cartItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst()
                .orElse(new CartItem());

        if (cartItem.getId() == null) {
            cartItem.setProduct(product);
            cartItem.setCart(cart);
            cartItem.setQuantity(0);
            cartItem.setTotalPrice(BigDecimal.ZERO);
            cart.getItems().add(cartItem);
        }

        cartItem.setQuantity(cartItem.getQuantity() + quantity);
        cartItem.setTotalPrice(product.getUnitPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));

        cart.calculateTotalPrice();
        return cartRepository.save(cart);
    }

    public Cart removeProductFromCart(Long cartId, Long productId) {
        Cart cart = getCart(cartId);
        cart.getItems().removeIf(item -> item.getProduct().getId().equals(productId));
        cart.calculateTotalPrice();
        return cartRepository.save(cart);
    }
}

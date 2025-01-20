package com.luv2code.ecommerce.entity;


import javax.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "cart")
@Data
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CartItem> items = new HashSet<>();

    @Column(name = "total_price")
    private BigDecimal totalPrice = BigDecimal.ZERO;

    public void addItem(CartItem item) {
        items.add(item);
        item.setCart(this);
        calculateTotalPrice();
    }

    public void removeItem(CartItem item) {
        items.remove(item);
        item.setCart(null);
        calculateTotalPrice();
    }

    public void calculateTotalPrice() {
        totalPrice = items.stream()
                .map(CartItem::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}

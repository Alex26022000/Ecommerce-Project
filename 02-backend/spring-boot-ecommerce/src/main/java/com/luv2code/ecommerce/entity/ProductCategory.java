package com.luv2code.ecommerce.entity;




import javax.persistence.*;
import lombok.Data;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name="product_category")
@Data
public class ProductCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    @Column(name = "id")
    private Long id;

    @Column(name = "category_name")
    private String categoryName;

}
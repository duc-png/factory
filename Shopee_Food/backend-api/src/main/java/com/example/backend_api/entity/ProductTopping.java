package com.example.backend_api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "product_toppings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class ProductTopping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer toppingID;

    @NotBlank
    @Size(max = 100)
    @Column(nullable = false, length = 100)
    private String toppingName;

    @NotNull
    @Column(nullable = false)
    private java.math.BigDecimal additionalPrice = java.math.BigDecimal.ZERO;

    @ManyToOne
    @JoinColumn(name = "productID")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "categoryID")
    private ToppingCategory toppingCategory;

    @OneToMany(mappedBy = "productTopping")
    private List<CartTopping> cartToppings;

    @OneToMany(mappedBy = "productTopping")
    private List<OrderTopping> orderToppings;
}
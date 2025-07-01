package com.example.backend_api.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cart_toppings", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"cartID", "toppingID"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class CartTopping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cartToppingID;

    @ManyToOne
    @JoinColumn(name = "cartID")
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "toppingID")
    private ProductTopping productTopping;
}
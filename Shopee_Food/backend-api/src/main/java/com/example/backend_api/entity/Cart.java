package com.example.backend_api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "cart", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"userID", "productID"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cartID;


    @NotNull
    @Column(nullable = false)
    private Integer quantity = 1;

    @Column
    private String note;

    @ManyToOne
    @JoinColumn(name = "userID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "productID")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "optionValueID")
    private OptionValue optionValue;

    @OneToMany(mappedBy = "cart")
    private List<CartTopping> cartToppings;
}
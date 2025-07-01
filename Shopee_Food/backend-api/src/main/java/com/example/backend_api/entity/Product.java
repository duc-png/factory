package com.example.backend_api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productID;

    @NotBlank
    @Size(max = 100)
    @Column(nullable = false, length = 100)
    private String productName;

    @NotNull
    @Column(nullable = false)
    private java.math.BigDecimal price;

    @NotNull
    @Column(nullable = false)
    private Integer stock = 0;

    @Column
    private String imageURL;

    @Column
    private String description;

    @NotNull
    @Column(nullable = false)
    private Boolean isActive = true;

    @ManyToOne
    @JoinColumn(name = "shopID")
    private Shop shop;

    @ManyToOne
    @JoinColumn(name = "categoryID")
    private Category category;

    @OneToMany(mappedBy = "product")
    private List<ProductOption> productOptions;

    @OneToMany(mappedBy = "product")
    private List<ProductTopping> productToppings;

    @OneToMany(mappedBy = "product")
    private List<Cart> carts;

    @OneToMany(mappedBy = "product")
    private List<OrderItem> orderItems;

    @OneToMany(mappedBy = "product")
    private List<FavoriteProduct> favoriteProducts;

    @OneToMany(mappedBy = "product")
    private List<Review> reviews;
}
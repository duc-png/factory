package com.example.backend_api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "order_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderItemID;

    @NotNull
    @Column(nullable = false)
    private Integer quantity;

    @NotNull
    @Column(nullable = false)
    private java.math.BigDecimal price;

    @Column
    private String note;

    @ManyToOne
    @JoinColumn(name = "orderID")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "productID")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "optionValueID")
    private OptionValue optionValue;

    @OneToMany(mappedBy = "orderItem")
    private List<OrderTopping> orderToppings;
}
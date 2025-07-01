package com.example.backend_api.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "order_toppings", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"orderItemID", "toppingID"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class OrderTopping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderToppingID;

    @ManyToOne
    @JoinColumn(name = "orderItemID")
    private OrderItem orderItem;

    @ManyToOne
    @JoinColumn(name = "toppingID")
    private ProductTopping productTopping;
}
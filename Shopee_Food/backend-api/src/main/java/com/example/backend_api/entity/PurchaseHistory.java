package com.example.backend_api.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "purchase_history")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class PurchaseHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer historyID;

    @ManyToOne
    @JoinColumn(name = "userID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "orderID")
    private Order order;

    @Column
    private java.sql.Timestamp purchaseDate;
}
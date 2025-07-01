package com.example.backend_api.entity;

import com.example.backend_api.model.enums.PayoutStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "shop_payouts", uniqueConstraints = {
        @UniqueConstraint(columnNames = "orderID")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class ShopPayout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer payoutID;

    @NotNull
    @Column(nullable = false)
    private java.math.BigDecimal payoutAmount;

    @Column
    private java.sql.Timestamp payoutDate;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private PayoutStatus status = PayoutStatus.Pending;

    @Column
    private String transactionID;

    @ManyToOne
    @JoinColumn(name = "orderID", unique = true)
    private Order order;

    @ManyToOne
    @JoinColumn(name = "shopID")
    private Shop shop;

}
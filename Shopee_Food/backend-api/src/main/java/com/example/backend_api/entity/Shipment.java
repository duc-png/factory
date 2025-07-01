package com.example.backend_api.entity;

import com.example.backend_api.model.enums.DeliveryStatus;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "shipments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Shipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer shipmentID;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private DeliveryStatus deliveryStatus = DeliveryStatus.Pending;

    @Column
    private java.sql.Timestamp deliveryDate;

    @ManyToOne
    @JoinColumn(name = "orderID")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "shipperID")
    private User shipper;

}
package com.example.backend_api.entity;

import com.example.backend_api.model.enums.ReportType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "reports")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reportID;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private ReportType reportType;

    @Column
    private java.sql.Timestamp reportDate;

    @Column
    private java.math.BigDecimal totalAmount;

    @Column
    private Integer totalOrders;

    @Column
    private Integer totalProducts;

    @Column
    private Integer totalCustomers;

    @Column
    private String details;

}
package com.example.backend_api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "option_values")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class OptionValue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer valueID;

    @NotBlank
    @Size(max = 100)
    @Column(nullable = false, length = 100)
    private String valueName;

    @NotNull
    @Column(nullable = false)
    private java.math.BigDecimal additionalPrice = java.math.BigDecimal.ZERO;

    @ManyToOne
    @JoinColumn(name = "optionID")
    private ProductOption productOption;

    @OneToMany(mappedBy = "optionValue")
    private List<Cart> carts;

    @OneToMany(mappedBy = "optionValue")
    private List<OrderItem> orderItems;
}
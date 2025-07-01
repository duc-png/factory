package com.example.backend_api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "product_options")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class ProductOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer optionID;

    @NotBlank
    @Size(max = 100)
    @Column(nullable = false, length = 100)
    private String optionName;

    @ManyToOne
    @JoinColumn(name = "productID")
    private Product product;

    @OneToMany(mappedBy = "productOption")
    private List<OptionValue> optionValues;
}
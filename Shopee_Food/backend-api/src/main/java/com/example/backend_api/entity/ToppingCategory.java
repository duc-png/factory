package com.example.backend_api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "topping_categories", uniqueConstraints = {
        @UniqueConstraint(columnNames = "categoryName")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class ToppingCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer categoryID;

    @NotBlank
    @Size(max = 100)
    @Column(nullable = false, unique = true, length = 100)
    private String categoryName;

    @OneToMany(mappedBy = "toppingCategory")
    private List<ProductTopping> productToppings;
}
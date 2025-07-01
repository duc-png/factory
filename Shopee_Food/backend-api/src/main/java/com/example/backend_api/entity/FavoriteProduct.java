package com.example.backend_api.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "favorite_products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class FavoriteProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer favoriteID;

    @ManyToOne
    @JoinColumn(name = "userID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "productID")
    private Product product;

    @Column
    private java.sql.Timestamp addedDate;
}
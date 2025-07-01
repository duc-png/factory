package com.example.backend_api.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "favorite_shops")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class FavoriteShop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer favoriteID;

    @ManyToOne
    @JoinColumn(name = "userID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "shopID")
    private Shop shop;

    @Column
    private java.sql.Timestamp addedDate;
}
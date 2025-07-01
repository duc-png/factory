package com.example.backend_api.entity;

import com.example.backend_api.model.enums.ShopStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "shops")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Shop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer shopID;

    @NotBlank
    @Size(max = 100)
    @Column(nullable = false, length = 100)
    private String shopName;

    @NotBlank
    @Column(nullable = false)
    private String address;

    @Size(max = 15)
    @Column(length = 15)
    private String phone;

    @Column
    private String logoURL;

    @ManyToOne
    @JoinColumn(name = "ownerID")
    private User owner;

    @Column
    private java.math.BigDecimal rating;

    @Column
    private java.sql.Timestamp createdAt;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private ShopStatus status;

    @OneToMany(mappedBy = "shop")
    private List<Product> products;

    @OneToMany(mappedBy = "shop")
    private List<ShopPayout> shopPayouts;

    @OneToMany(mappedBy = "shop")
    private List<FavoriteShop> favoriteShops;

    @OneToMany(mappedBy = "shop")
    private List<Voucher> vouchers;

}
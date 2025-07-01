package com.example.backend_api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email")
})
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userID;

    @NotBlank
    @Size(max = 50)
    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @NotBlank
    @Size(max = 255)
    @Column(nullable = false, length = 255)
    private String password;

    @NotBlank
    @Email
    @Size(max = 100)
    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Size(max = 15)
    @Column(length = 15)
    private String phone;

    @Column
    private String provider;

    @Column
    private String providerId;

    @NotNull
    @Column(nullable = false)
    private Boolean isActive = true;

    @Column
    private String avatarURL;

    @Column
    private java.sql.Timestamp createdAt;

    @Column
    private java.sql.Timestamp lastLogin;

    // Authentication fields
    @Column
    private java.sql.Timestamp updatedAt;

    @Column
    private Boolean emailVerified = false;

    @Column
    private java.sql.Timestamp emailVerifiedAt;

    @Column
    private Integer loginAttempts = 0;

    @Column
    private java.sql.Timestamp lockedUntil;

    @Column
    private Boolean twoFactorEnabled = false;

    @Column
    private String twoFactorSecret;

    // Relationships
    @OneToMany(mappedBy = "user")
    private List<Address> addresses;

    @OneToMany(mappedBy = "user")
    private List<Order> orders;

    @OneToMany(mappedBy = "user")
    private List<UserRole> userRoles;

    @OneToMany(mappedBy = "user")
    private List<AuditLog> auditLogs;

    @OneToMany(mappedBy = "user")
    private List<Cart> carts;

    @OneToMany(mappedBy = "user")
    private List<FavoriteProduct> favoriteProducts;

    @OneToMany(mappedBy = "user")
    private List<FavoriteShop> favoriteShops;

    @OneToMany(mappedBy = "user")
    private List<PurchaseHistory> purchaseHistories;

    @OneToMany(mappedBy = "user")
    private List<Review> reviews;

    @OneToMany(mappedBy = "user")
    private List<Token> tokens;

    @OneToMany(mappedBy = "user")
    private List<UserVoucher> userVouchers;

    @OneToMany(mappedBy = "owner")
    private List<Shop> ownedShops;

    @OneToMany(mappedBy = "shipper")
    private List<Shipment> shipments;

    @OneToMany(mappedBy = "shipper")
    private List<ShipperPayout> shipperPayouts;

    // Lifecycle callbacks
    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = new java.sql.Timestamp(System.currentTimeMillis());
        }
        updatedAt = createdAt;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = new java.sql.Timestamp(System.currentTimeMillis());
    }
}
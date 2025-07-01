package com.example.backend_api.entity;

import com.example.backend_api.model.enums.TokenType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "tokens")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer tokenID;

    @NotBlank
    @Column(nullable = false, length = 512)
    private String token;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private TokenType tokenType = TokenType.ACCESS;

    @Column
    private java.sql.Timestamp issuedAt;

    @Column
    private java.sql.Timestamp expiresAt;

    @Column
    private Boolean revoked = false;

    @Column
    private String deviceInfo;

    @Column
    private String ipAddress;

    @Column
    private String userAgent;

    @Column
    private java.sql.Timestamp lastUsedAt;

    @ManyToOne
    @JoinColumn(name = "userID", nullable = false)
    private User user;

    // Lifecycle callbacks
    @PrePersist
    protected void onCreate() {
        if (issuedAt == null) {
            issuedAt = new java.sql.Timestamp(System.currentTimeMillis());
        }
    }

    @PreUpdate
    protected void onUpdate() {
        lastUsedAt = new java.sql.Timestamp(System.currentTimeMillis());
    }
}
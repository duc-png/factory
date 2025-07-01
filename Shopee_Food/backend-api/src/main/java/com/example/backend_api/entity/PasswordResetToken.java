package com.example.backend_api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "password_reset_tokens")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class PasswordResetToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @Column(nullable = false, length = 255, unique = true)
    private String token;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "userID", nullable = false)
    private User user;

    @NotNull
    @Column(nullable = false)
    private java.sql.Timestamp expiresAt;

    @Column
    private Boolean used = false;

    @Column(length = 45)
    private String ipAddress;

    @Column
    private java.sql.Timestamp createdAt;

    // Lifecycle callbacks
    @PrePersist
    protected void onCreate() {
        createdAt = new java.sql.Timestamp(System.currentTimeMillis());
    }

    // Helper methods
    public boolean isExpired() {
        return expiresAt.before(new java.sql.Timestamp(System.currentTimeMillis()));
    }

    public boolean isValid() {
        return !used && !isExpired();
    }
}

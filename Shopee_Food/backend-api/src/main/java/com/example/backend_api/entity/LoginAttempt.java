package com.example.backend_api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "login_attempts", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"identifier", "identifierType"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class LoginAttempt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @Column(nullable = false, length = 255)
    private String identifier; // email hoặc IP address

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private IdentifierType identifierType;

    @Column
    private Integer attempts = 1;

    @Column
    private java.sql.Timestamp lastAttemptAt;

    @Column
    private java.sql.Timestamp blockedUntil;

    // Lifecycle callbacks
    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        lastAttemptAt = new java.sql.Timestamp(System.currentTimeMillis());
    }

    // Helper methods
    public boolean isBlocked() {
        return blockedUntil != null && 
               blockedUntil.after(new java.sql.Timestamp(System.currentTimeMillis()));
    }

    public void incrementAttempts() {
        this.attempts++;
        if (this.attempts >= getMaxAttempts()) {
            blockFor(getBlockDurationMinutes());
        }
    }

    public void resetAttempts() {
        this.attempts = 0;
        this.blockedUntil = null;
    }

    private void blockFor(int minutes) {
        long blockUntilTime = System.currentTimeMillis() + (minutes * 60 * 1000L);
        this.blockedUntil = new java.sql.Timestamp(blockUntilTime);
    }

    private int getMaxAttempts() {
        return identifierType == IdentifierType.EMAIL ? 5 : 10;
    }

    private int getBlockDurationMinutes() {
        return identifierType == IdentifierType.EMAIL ? 15 : 30;
    }

    public enum IdentifierType {
        EMAIL, IP
    }
}

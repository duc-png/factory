package com.example.backend_api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "user_roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class UserRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userRoleID;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "userID", nullable = false)
    private User user;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "roleID", nullable = false)
    private Role role;

    @Column
    private java.sql.Timestamp assignedAt;

    @ManyToOne
    @JoinColumn(name = "assignedBy")
    private User assignedBy;

    // Lifecycle callbacks
    @PrePersist
    protected void onCreate() {
        assignedAt = new java.sql.Timestamp(System.currentTimeMillis());
    }
}
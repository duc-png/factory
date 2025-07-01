package com.example.backend_api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "roles", uniqueConstraints = {
        @UniqueConstraint(columnNames = "roleName")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roleID;

    @NotBlank
    @Size(max = 50)
    @Column(nullable = false, unique = true, length = 50)
    private String roleName;

    @Column(length = 255)
    private String description;

    @Column(columnDefinition = "JSON")
    private String permissions;

    @Column
    private Boolean isActive = true;

    @Column
    private java.sql.Timestamp createdAt;

    @Column
    private java.sql.Timestamp updatedAt;

    @OneToMany(mappedBy = "role")
    private List<UserRole> userRoles;

    // Lifecycle callbacks
    @PrePersist
    protected void onCreate() {
        createdAt = new java.sql.Timestamp(System.currentTimeMillis());
        updatedAt = createdAt;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = new java.sql.Timestamp(System.currentTimeMillis());
    }
}
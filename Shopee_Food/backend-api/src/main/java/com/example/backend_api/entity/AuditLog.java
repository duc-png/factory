package com.example.backend_api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Table(name = "auditlogs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer logID;
    // @NotBlank là để trường khog null, không rỗng, và không chứa mỗi khoangr trắng
    @NotBlank
    @Size(max = 100)
    @Column(nullable = false, length = 100)
    private String action;

    @Size(max = 50)
    @Column(length = 50)
    private String targetType;

    @Column
    private Integer targetID;

    @Column
    private String description;

    @Column
    private String ipAddress;

    @Column(length = 500)
    private String userAgent;

    @Column
    private Integer targetUserID;

    // Dùng java.sql.Timestamp để lưu thời gian tạo
    @Column
    private java.sql.Timestamp createdAt;

    @ManyToOne
    @JoinColumn(name = "userID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "targetUserID", insertable = false, updatable = false)
    private User targetUser;

    // Lifecycle callbacks
    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = new java.sql.Timestamp(System.currentTimeMillis());
        }
    }
}

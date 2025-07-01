package com.example.backend_api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "review_images")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class ReviewImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer imageID;

    @NotBlank
    @Column(nullable = false)
    private String imageURL;

    @Column
    private java.sql.Timestamp uploadDate;

    @ManyToOne
    @JoinColumn(name = "reviewID")
    private Review review;
}
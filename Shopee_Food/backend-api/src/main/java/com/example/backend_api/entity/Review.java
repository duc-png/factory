package com.example.backend_api.entity;

import com.example.backend_api.model.enums.ReviewType;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reviewID;

    @Column
    private Integer rating;

    @Column
    private String comment;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private ReviewType reviewType = ReviewType.product;

    @Column
    private java.sql.Timestamp reviewDate;

    @ManyToOne
    @JoinColumn(name = "userID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "productID")
    private Product product;

    @OneToMany(mappedBy = "review")
    private List<ReviewImage> reviewImages;

}
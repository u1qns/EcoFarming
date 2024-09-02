package com.a101.ecofarming.ChallengeCategory.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class ChallengeCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private int id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String thumbPhoto;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String guideText;

    @Column(nullable = false, name = "guide_photo_o")
    private String guidePhotoO;

    @Column(nullable = false, name = "guide_photo_x")
    private String guidePhotoX;
}

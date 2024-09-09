package com.a101.ecofarming.challengeCategory.entity;

import com.a101.ecofarming.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class ChallengeCategory extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private int id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String thumbPhotoUrl;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String guideText;

    @Column(nullable = false, name = "right_guide_photo_url")
    private String rightGuidePhotoUrl;

    @Column(nullable = false, name = "wrong_guide_photo_url")
    private String wrongGuidePhotoUrl;
}

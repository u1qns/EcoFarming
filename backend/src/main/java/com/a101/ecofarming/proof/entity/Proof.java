package com.a101.ecofarming.proof.entity;

import com.a101.ecofarming.challenge.entity.Challenge;
import com.a101.ecofarming.global.entity.BaseEntity;
import com.a101.ecofarming.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "proof", indexes = {
        @Index(name = "idx_proof_challenge_user", columnList = "challenge_id, user_id"),
        @Index(name = "idx_proof_challenge", columnList = "challenge_id")
})
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Proof extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "proof_id", nullable = false, length = 255)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id", nullable = false)
    private Challenge challenge;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "photo_url", nullable = false, length = 255)
    private String photoUrl;

    @Column(name = "is_valid", nullable = false)
    @Builder.Default
    private Boolean isValid = true;

    public void setIsValid(Boolean isValid) {
        this.isValid = isValid;
    }
}

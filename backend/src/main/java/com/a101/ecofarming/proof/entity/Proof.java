package com.a101.ecofarming.proof.entity;

import com.a101.ecofarming.global.audit.Auditable;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Proof")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Proof extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "proof_id", nullable = false, length = 255)
    private Integer proofId;

    @Column(name = "challenge_id", nullable = false)
    private Integer challengeId;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "photo_url", nullable = false, length = 255)
    private String photoUrl;

    @Column(name = "is_valid", nullable = false)
    @Builder.Default
    private Boolean isValid = true;
}

package com.a101.ecofarming.proof.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "Proof")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Proof {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "proof_id", nullable = false, length = 255)
    private Integer proofId;

    @Column(name = "challenge_id", nullable = false)
    private Integer challengeId;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "photo_url", length = 255)
    private String photoUrl;

    @Column(name = "is_valid", nullable = false)
    private Integer isValid = 1;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @Column(name = "updated_at")
    private LocalDate updatedAt;
}

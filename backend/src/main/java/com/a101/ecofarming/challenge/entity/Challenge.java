package com.a101.ecofarming.challenge.entity;

import com.a101.ecofarming.balanceGame.entity.BalanceGame;
import com.a101.ecofarming.challengeCategory.entity.ChallengeCategory;
import com.a101.ecofarming.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Challenge extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "challenge_id")
    private Integer id;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private Byte frequency;

    @Column(nullable = false)
    private Byte duration;

    @Column(nullable = false)
    @Builder.Default
    private Integer totalBetAmountOption1 = 0;

    @Column(nullable = false)
    @Builder.Default
    private Integer totalBetAmountOption2 = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "balance_id", nullable = false)
    private BalanceGame balanceGame;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private ChallengeCategory challengeCategory;
}

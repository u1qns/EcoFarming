package com.a101.ecofarming.challenge.entity;

import com.a101.ecofarming.balanceGame.entity.BalanceGame;
import com.a101.ecofarming.challengeCategory.entity.ChallengeCategory;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Challenge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "challenge_id")
    private int id;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private int frequency;

    @Column(nullable = false)
    private int period;

    private int totalBetMoneyOption1;

    private int totalBetMoneyOption2;

    @ManyToOne
    @JoinColumn(name = "balance_id", nullable = false)
    private BalanceGame balanceGame;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private ChallengeCategory challengeCategory;
}

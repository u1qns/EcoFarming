package com.a101.ecofarming.challengeUser.entity;

import com.a101.ecofarming.challenge.entity.Challenge;
import com.a101.ecofarming.global.entity.BaseEntity;
import com.a101.ecofarming.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "challenge_user", indexes = {
        @Index(name = "idx_challenge_user_challenge_id", columnList = "challenge_id"),
        @Index(name = "idx_challenge_user_user_id", columnList = "user_id"),
        @Index(name = "idx_challenge_user_success_rate", columnList = "success_rate")
})
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder

public class ChallengeUser extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "challenge_user_id")
    private Integer challengeUserId;

    @ManyToOne
    @JoinColumn(name = "challenge_id", nullable = false)
    private Challenge challenge;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "bet_amount", nullable = false)
    private Integer betAmount;

    @Column(name = "balance_game_pick", nullable = false)
    private Byte balanceGamePick;

    @Builder.Default
    @Column(name = "return_amount", nullable = false)
    private Integer returnAmount =0;

    @Builder.Default
    @Column(name = "success_rate", nullable = false)
    private Byte successRate =0;

    public void setSuccessRate(Byte successRate) {
        this.successRate = successRate;
    }
}

package com.a101.ecofarming.challengeUser.entity;

import com.a101.ecofarming.challenge.entity.Challenge;
import com.a101.ecofarming.global.entity.BaseEntity;
import com.a101.ecofarming.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "challenge_user")
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

    @Column(name = "return_amount", nullable = false)
    private Integer returnAmount;

    @Column(name = "success_rate", nullable = false)
    private Byte successRate;

    public void setSuccessRate(Byte successRate) {
        this.successRate = successRate;
    }
}

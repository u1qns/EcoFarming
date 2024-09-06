package com.a101.ecofarming.challengeUser.entity;

import com.a101.ecofarming.challenge.entity.Challenge;
import com.a101.ecofarming.user.entity.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Entity
@Table(name = "challenge_user")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChallengeUser {

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

    @Column(name = "bet_amount")
    private Integer betAmount;

    @Column(name = "balance_game_pick")
    private Boolean balanceGamePick;

    @Column(name = "return_amount")
    private Integer returnAmount;

    @Column(name = "success_rate", nullable = false)
    private Boolean successRate;

}
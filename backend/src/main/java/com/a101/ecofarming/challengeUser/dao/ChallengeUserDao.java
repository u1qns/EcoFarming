package com.a101.ecofarming.challengeUser.dao;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class ChallengeUserDao {
    private int challengeUserId;
    private int challengeId;
    private int userId;
    private int betAmount;
    private Byte balanceGamePick;
    private int returnAmount;
    private Byte successRate;

    public void updateReturnAmount(int returnAmount) { this.returnAmount = returnAmount; }
}

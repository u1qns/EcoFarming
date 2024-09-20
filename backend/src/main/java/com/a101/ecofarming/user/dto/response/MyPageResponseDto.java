package com.a101.ecofarming.user.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class MyPageResponseDto {
    private Integer amount;
    private Integer prizeAmount;
    private Long upcomingChallengeCount;
    private Long ongoingChallengeCount;
    private Long completedChallengeCount;
}

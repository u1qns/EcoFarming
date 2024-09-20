package com.a101.ecofarming.challengeUser.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ChallengeCountsDto {
    private Long upcomingChallengeCount;
    private Long ongoingChallengeCount;
    private Long completedChallengeCount;
}

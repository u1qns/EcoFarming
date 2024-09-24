package com.a101.ecofarming.user.dto.response;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class MyPageResponseDto {
    private Integer amount;
    private Integer prizeAmount;
    private Long upcomingChallengeCount;
    private Long ongoingChallengeCount;
    private Long completedChallengeCount;
}

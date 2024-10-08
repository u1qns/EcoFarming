package com.a101.ecofarming.challengeUser.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ChallengeUserResponseDto {
    private Integer challengeId;
    private String title;
    private LocalDate startDate;
    private LocalDate endDate;
    private Byte frequency;
    private Byte duration;
    private Byte successRate;
    private String thumbPhotoUrl;
    private Integer returnAmount;
    private Long totalParticipationCount;
}

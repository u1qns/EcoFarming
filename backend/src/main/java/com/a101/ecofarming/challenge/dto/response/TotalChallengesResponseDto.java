package com.a101.ecofarming.challenge.dto.response;

import lombok.*;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class TotalChallengesResponseDto {
    private List<TotalChallengeDto> upcomingChallenge;
    private List<TotalChallengeDto> ongoingChallenge;
}

package com.a101.ecofarming.challenge.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class TotalChallengeDto {
    private Integer challengeId;
    private String challengeTitle;
    private Byte duration;
    private Byte frequency;
    private Integer userCount;
}

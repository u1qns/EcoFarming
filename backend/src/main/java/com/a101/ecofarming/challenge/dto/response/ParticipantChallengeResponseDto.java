package com.a101.ecofarming.challenge.dto.response;

import com.a101.ecofarming.proof.dto.response.ProofDetailDto;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class ParticipantChallengeResponseDto {
    private String type = "ParticipantChallengeResponseDto";
    private Integer id;
    private String title;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private Byte frequency;
    private Byte duration;
    private Long userCount;
    private String guideText;
    private Byte successRate;
    private Integer balanceId;
    private Byte balanceGamePick;
    private List<ProofDetailDto> proofs;
    private String thumbPhotoUrl;

    private Integer totalBetAmountOption1;
    private Integer totalBetAmountOption2;
    private Integer prizeAmount;

}

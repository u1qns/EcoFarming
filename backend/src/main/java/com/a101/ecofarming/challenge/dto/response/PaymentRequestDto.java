package com.a101.ecofarming.challenge.dto.response;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class PaymentRequestDto {
    private Integer challengeId;
    private Integer userId;
    private Integer balanceId;
    private Byte balanceGamePick;
    private Integer amount;
    private Integer betAmount;
}

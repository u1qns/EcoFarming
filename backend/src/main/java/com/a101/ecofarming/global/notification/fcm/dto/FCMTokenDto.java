package com.a101.ecofarming.global.notification.fcm.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Getter
@Builder
@Data
public class FCMTokenDto {
    Integer userId;
    String deviceId;
    String token;
}

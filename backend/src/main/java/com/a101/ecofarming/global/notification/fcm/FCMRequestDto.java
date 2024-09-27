package com.a101.ecofarming.global.notification.fcm;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class FCMRequestDto {
    private String token;
    private String title;
    private String body;
}
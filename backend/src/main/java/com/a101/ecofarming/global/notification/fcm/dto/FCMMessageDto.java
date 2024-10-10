package com.a101.ecofarming.global.notification.fcm.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Builder
public class FCMMessageDto {
    private String title;
    private String body;
}
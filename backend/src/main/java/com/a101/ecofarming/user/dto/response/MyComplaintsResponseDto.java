package com.a101.ecofarming.user.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class MyComplaintsResponseDto {
    private Integer complaintId;
    private String title;
    private String description;
    private String photoUrl;
    private Boolean isApproved;
    private LocalDateTime complaintDate;
}
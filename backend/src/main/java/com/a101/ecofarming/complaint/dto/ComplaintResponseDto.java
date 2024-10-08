package com.a101.ecofarming.complaint.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ComplaintResponseDto {
    private Integer id;
    private String description;
    private Boolean adminPass;
    private Integer proofId;
    private Integer userId;
}
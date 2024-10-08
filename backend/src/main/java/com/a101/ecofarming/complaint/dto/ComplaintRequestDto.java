package com.a101.ecofarming.complaint.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
public class ComplaintRequestDto {
    private Integer proofId;
    private String description;
}
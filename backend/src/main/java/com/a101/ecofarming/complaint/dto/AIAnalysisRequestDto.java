package com.a101.ecofarming.complaint.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AIAnalysisRequestDto {
    private Integer complaintId;
    private Boolean aiPass;
}

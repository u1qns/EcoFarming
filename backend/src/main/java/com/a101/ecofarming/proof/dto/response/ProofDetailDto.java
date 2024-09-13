package com.a101.ecofarming.proof.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProofDetailDto {
    private Integer proofId;
    private String photoUrl;
    private String userName;
    private Boolean isValid;
    private LocalDateTime createdAt;
}
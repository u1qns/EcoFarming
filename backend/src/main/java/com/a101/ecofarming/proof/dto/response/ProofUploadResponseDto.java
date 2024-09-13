package com.a101.ecofarming.proof.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProofUploadResponseDto {
    private Integer proofId;
    private Byte progress;
}

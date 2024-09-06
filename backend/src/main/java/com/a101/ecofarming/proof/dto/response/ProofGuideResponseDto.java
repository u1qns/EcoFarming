package com.a101.ecofarming.proof.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProofGuideResponseDto {
    private String guideText;
    private String rightGuidePhotoUrl;
    private String wrongGuidePhotoUrl;
}

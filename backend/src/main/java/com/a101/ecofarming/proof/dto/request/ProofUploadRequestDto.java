package com.a101.ecofarming.proof.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProofUploadRequestDto {
    private Integer challengeId;
    private MultipartFile photo;
}

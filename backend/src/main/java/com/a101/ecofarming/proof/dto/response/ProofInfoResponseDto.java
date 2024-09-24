package com.a101.ecofarming.proof.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProofInfoResponseDto {
    private List<ProofDetailDto> proofs;
}
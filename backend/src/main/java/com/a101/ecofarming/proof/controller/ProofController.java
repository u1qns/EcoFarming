package com.a101.ecofarming.proof.controller;

import com.a101.ecofarming.challenge.service.ChallengeService;
import com.a101.ecofarming.challengeCategory.service.ChallengeCategoryService;
import com.a101.ecofarming.proof.dto.request.ProofUploadRequestDto;
import com.a101.ecofarming.proof.dto.response.ProofGuideResponseDto;
import com.a101.ecofarming.proof.dto.response.ProofInfoResponseDto;
import com.a101.ecofarming.proof.dto.response.ProofUploadResponseDto;
import com.a101.ecofarming.proof.service.ProofService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/proof")
public class ProofController {

    private final ProofService proofService;
    private final ChallengeCategoryService challengeCategoryService;

    @Autowired
    public ProofController(ProofService proofService,
                           ChallengeCategoryService challengeCategoryService) {
        this.proofService = proofService;
        this.challengeCategoryService = challengeCategoryService;
    }

    @GetMapping("/{challengeId}/guide")
    public ResponseEntity<ProofGuideResponseDto> getGuide(@PathVariable("challengeId") Integer challengeId) {
        ProofGuideResponseDto response = challengeCategoryService.getGuideInfo(challengeId);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ProofUploadResponseDto> uploadProof(@ModelAttribute ProofUploadRequestDto requestDto) {
        ProofUploadResponseDto response = proofService.uploadProof(requestDto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{challengeId}")
    public ProofInfoResponseDto getProofsByChallengeId(
            @PathVariable("challengeId") Integer challengeId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return proofService.getProofsByChallengeId(challengeId, pageable);
    }

    @GetMapping("/{challengeId}/{userId}")
    public ProofInfoResponseDto getProofsByChallengeIdAndUserId(
            @PathVariable("challengeId") Integer challengeId,
            @PathVariable("userId") Integer userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return proofService.getProofsByChallengeIdAndUserId(challengeId, userId, pageable);
    }

    @GetMapping("/{challengeId}/verification")
    public ResponseEntity<Integer> verifyChallenge(@PathVariable Integer challengeId) {
        Integer todayChallengeUserCount  = proofService.getTodayChallengeVerificationCount(challengeId);
        return ResponseEntity.ok(todayChallengeUserCount );
    }
}

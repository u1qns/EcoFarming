package com.a101.ecofarming.challenge.controller;

import com.a101.ecofarming.challenge.dto.response.ChallengeResponseDto;
import com.a101.ecofarming.challenge.service.ChallengeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/challenges")
@RequiredArgsConstructor
public class ChallengeController {

    private final ChallengeService challengeService;

    // 시작 전, 진행 중 챌린지 조회
    @GetMapping("")
    public ResponseEntity<?> findAllChallenge(){
        ChallengeResponseDto response = challengeService.findAllChallenge();

        return ResponseEntity.ok(response);
    }
}

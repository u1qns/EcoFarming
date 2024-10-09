package com.a101.ecofarming.challenge.controller;

import com.a101.ecofarming.challenge.dto.response.*;
import com.a101.ecofarming.challenge.service.ChallengeService;
import com.a101.ecofarming.challengeUser.service.ChallengeUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/challenges")
@RequiredArgsConstructor
@Slf4j
public class ChallengeController {

    private final ChallengeService challengeService;
    private final ChallengeUserService challengeUserService;


    // 시작 전, 진행 중 챌린지 조회
    @GetMapping("")
    public ResponseEntity<?> findAllChallenge() {
        TotalChallengesResponseDto response = challengeService.findAllChallenge();
        return ResponseEntity.ok(response);
    }

    @GetMapping("{challengeId}")
    public ResponseEntity<?> getChallengeDetails(
            @PathVariable("challengeId") Integer challengeId) {
        log.info("챌린지 상세 조회 요청 : {}", challengeId);
        Object response = challengeUserService.getChallengeDetailsByUser(challengeId);
        if (response instanceof ParticipantChallengeResponseDto) {
            return ResponseEntity.ok((ParticipantChallengeResponseDto) response);
        } else {
            return ResponseEntity.ok((NoParticipantChallengeResponseDto) response);
        }
    }

    @GetMapping("{challengeId}/{userId}/payment")
    public ResponseEntity<PaymentResponseDto> goToPayment(
            @PathVariable("challengeId") Integer challengeId,
            @PathVariable("userId") Integer userId) {
        PaymentResponseDto responseDto = challengeUserService.goToPayment(challengeId, userId);
        return ResponseEntity.ok(responseDto);

    }

    @PostMapping("{challengeId}/{userId}/payment")
    public ResponseEntity<?> submitPayment(
            @PathVariable("challengeId") Integer challengeId,
            @PathVariable("userId") Integer userId,
            @RequestBody PaymentRequestDto paymentRequestDto) {
        challengeUserService.submitPayment(challengeId, userId, paymentRequestDto);
        return ResponseEntity.ok().build();
    }

}

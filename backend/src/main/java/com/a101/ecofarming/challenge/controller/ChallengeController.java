package com.a101.ecofarming.challenge.controller;

import com.a101.ecofarming.challenge.dto.response.TotalChallengesResponseDto;
import com.a101.ecofarming.challenge.dto.response.NoParticipantChallengeResponseDto;
import com.a101.ecofarming.challenge.dto.response.ParticipantChallengeResponseDto;
import com.a101.ecofarming.challenge.dto.response.*;
import com.a101.ecofarming.challenge.service.ChallengeService;
import com.a101.ecofarming.challengeUser.service.ChallengeUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/challenges")
@RequiredArgsConstructor
public class ChallengeController {

    private final ChallengeService challengeService;
    private final ChallengeUserService challengeUserService;


    // 시작 전, 진행 중 챌린지 조회
    @GetMapping("")
    public ResponseEntity<?> findAllChallenge(){
        TotalChallengesResponseDto response = challengeService.findAllChallenge();

        return ResponseEntity.ok(response);
    }

    @GetMapping("{challengeId}/{userId}")
    public ResponseEntity<?> getChallengeDetails(@PathVariable("challengeId") Integer challengeId, @PathVariable("userId") Integer userId){
        Object response = challengeUserService.getChallengeDetailsByUser(challengeId, userId);
        if (response instanceof ParticipantChallengeResponseDto) {
            return ResponseEntity.ok((ParticipantChallengeResponseDto) response);
        }else if (response instanceof NoParticipantChallengeResponseDto) {
            return ResponseEntity.ok((NoParticipantChallengeResponseDto) response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No data found");
        }
    }
    @GetMapping("{challengeId}/{userId}/payment")
    public ResponseEntity<PaymentResponseDto> goToPayment(@PathVariable("challengeId") Integer challengeId, @PathVariable("userId") Integer userId){
        Object response = challengeUserService.getChallengeDetailsByUser(challengeId, userId);

        PaymentResponseDto responseDto = challengeUserService.goToPayment(challengeId, userId);
        if(responseDto != null){
            return ResponseEntity.ok(responseDto);
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
//    @PostMapping("{challengeId}/{userId}/payment")
//    public ResponseEntity<?> submitPayment(@PathVariable("challengeId") Integer challengeId, @PathVariable("userId") Integer userId, @RequestBody PaymentRequestDto paymentRequestDto) {
//
//
//        try {
//            challengeUserService.submitPayment(challengeId, userId, paymentRequestDto);
//            return ResponseEntity.ok().build();
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
//        }
//
//    }

}

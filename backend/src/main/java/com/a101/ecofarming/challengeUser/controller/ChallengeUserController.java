package com.a101.ecofarming.challengeUser.controller;

import com.a101.ecofarming.challengeUser.dto.response.ChallengeUserResponseDto;
import com.a101.ecofarming.challengeUser.service.ChallengeUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import static com.a101.ecofarming.challengeUser.service.ChallengeStatus.*;

@RestController
@RequestMapping("/challenge-user")
@RequiredArgsConstructor
public class ChallengeUserController {

    private final ChallengeUserService challengeUserService;

    @GetMapping("/upcoming")
    public ResponseEntity<?> findUpcomingChallenges(){
        List<ChallengeUserResponseDto> response = challengeUserService.findChallengesByUserId(UPCOMING);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/ongoing")
    public ResponseEntity<?> findOngoingChallenges(){
        List<ChallengeUserResponseDto> response = challengeUserService.findChallengesByUserId(ONGOING);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/completed")
    public ResponseEntity<?> findCompletedChallenges(){
        List<ChallengeUserResponseDto> response = challengeUserService.findChallengesByUserId(COMPLETED);

        return ResponseEntity.ok(response);
    }
}

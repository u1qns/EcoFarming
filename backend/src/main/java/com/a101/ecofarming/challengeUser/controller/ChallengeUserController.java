package com.a101.ecofarming.challengeUser.controller;

import com.a101.ecofarming.challengeUser.dto.response.ChallengeUserResponseDto;
import com.a101.ecofarming.challengeUser.service.ChallengeUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import static com.a101.ecofarming.challengeUser.service.ChallengeStatus.*;

@RestController
@RequestMapping("/challenge-user")
@RequiredArgsConstructor
public class ChallengeUserController {

    private final ChallengeUserService challengeUserService;

    @GetMapping("/{userId}/upcoming")
    public ResponseEntity<?> findUpcomingChallengesByUserId(@PathVariable("userId") Integer userId){
        List<ChallengeUserResponseDto> response = challengeUserService.findChallengesByUserId(userId, UPCOMING);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}/ongoing")
    public ResponseEntity<?> findOngoingChallengesByUserId(@PathVariable("userId") Integer userId){
        List<ChallengeUserResponseDto> response = challengeUserService.findChallengesByUserId(userId, ONGOING);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}/completed")
    public ResponseEntity<?> findCompletedChallengesByUserId(@PathVariable("userId") Integer userId){
        List<ChallengeUserResponseDto> response = challengeUserService.findChallengesByUserId(userId, COMPLETED);

        return ResponseEntity.ok(response);
    }
}

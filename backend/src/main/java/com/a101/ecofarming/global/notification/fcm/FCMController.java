package com.a101.ecofarming.global.notification.fcm;

import com.a101.ecofarming.challenge.entity.Challenge;
import com.a101.ecofarming.challenge.repository.ChallengeRepository;
import com.a101.ecofarming.global.exception.CustomException;
import com.a101.ecofarming.global.exception.ErrorCode;
import com.a101.ecofarming.global.notification.NotificationManager;
import com.a101.ecofarming.global.notification.fcm.dto.FCMSubDto;
import com.a101.ecofarming.global.notification.fcm.dto.FCMTokenDto;
import com.google.firebase.messaging.FirebaseMessagingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/fcm")
public class FCMController {

    private final FCMService fcmService;
    private final NotificationManager notificationManager;
    private final ChallengeRepository challengeRepository;

    @Autowired
    public FCMController(FCMService fcmService, NotificationManager notificationManager, ChallengeRepository challengeRepository) {
        this.fcmService = fcmService;
        this.notificationManager = notificationManager;
        this.challengeRepository = challengeRepository;
    }

    @PostMapping("/token")
    public ResponseEntity<String> saveToken(@RequestBody FCMTokenDto requestDto) {
        fcmService.saveToken(requestDto);
        return ResponseEntity.ok("FCM 토큰 저장에 성공했습니다.");
    }

    @PostMapping("/subscribe")
    public ResponseEntity<String> subscribe(@RequestBody FCMSubDto fcmSubDto)
            throws FirebaseMessagingException {
        fcmService.subscribeFromTopic(fcmSubDto);
        return ResponseEntity.ok("subscribed successfully");
    }

    @PostMapping("/unsubscribe")
    public ResponseEntity<String> unsubscribe(@RequestBody FCMSubDto fcmSubDto)
            throws FirebaseMessagingException {
        fcmService.unsubscribeFromTopic(fcmSubDto);
        return ResponseEntity.ok("Unsubscribed successfully");
    }

    // TEST 용
    @PostMapping("/send-test")
    public ResponseEntity<String> sendNotification(@RequestParam Integer challengeId, @RequestParam Integer type)
            throws FirebaseMessagingException {
        Challenge challenge = challengeRepository.findById(challengeId).
                orElseThrow(() -> new CustomException(ErrorCode.CHALLENGE_NOT_FOUND));
        notificationManager.sendNotification(challenge, type);
        return ResponseEntity.ok("FCM 알림 전송에 성공했습니다.");
    }
}

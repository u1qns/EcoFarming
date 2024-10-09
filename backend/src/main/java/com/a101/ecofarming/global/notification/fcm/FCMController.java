package com.a101.ecofarming.global.notification.fcm;

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

    @Autowired
    public FCMController(FCMService fcmService) {
        this.fcmService = fcmService;
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
    public ResponseEntity<String> sendNotification(@RequestParam String topic)
            throws FirebaseMessagingException {
        fcmService.sendMessageWithTopic(topic);
        return ResponseEntity.ok("FCM 알림 전송에 성공했습니다.");
    }
}

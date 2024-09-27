package com.a101.ecofarming.global.notification.fcm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/fcm-test")
public class FCMController {

    private final FCMService fcmService;

    @Autowired
    public FCMController(FCMService fcmService) {
        this.fcmService = fcmService;
    }

    @PostMapping
    public ResponseEntity<String> sendNotification(@RequestBody FCMRequestDto request) {
        try {
            fcmService.sendMessage(request.getToken(), request.getTitle(), request.getBody());
            return ResponseEntity.ok("FCM Notification sent successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to send FCM notification");
        }
    }
}
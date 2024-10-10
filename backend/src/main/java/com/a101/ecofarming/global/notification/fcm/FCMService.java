package com.a101.ecofarming.global.notification.fcm;

import static com.a101.ecofarming.global.exception.ErrorCode.*;

import com.a101.ecofarming.challenge.entity.Challenge;
import com.a101.ecofarming.global.exception.CustomException;
import com.a101.ecofarming.global.notification.fcm.dto.FCMMessageDto;
import com.a101.ecofarming.global.notification.fcm.dto.FCMSubDto;
import com.a101.ecofarming.global.notification.fcm.dto.FCMTokenDto;
import com.a101.ecofarming.user.entity.User;
import com.a101.ecofarming.user.repository.UserRepository;
import com.google.firebase.messaging.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class FCMService {

    private final UserRepository userRepository;
    private final RedisTemplate<String, String> redisTemplate;

    // Firebase 토큰을 Redis에 저장
    public void saveToken(FCMTokenDto requestDto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
        String key = generateFcmKey(user.getId());
        saveTokenToRedis(key, requestDto.getToken());
    }

    private String generateFcmKey(Integer userId) {
        return "FCM:" + userId;
    }

    private void saveTokenToRedis(String key, String token) {
        String existingToken = redisTemplate.opsForValue().get(key);
        if (existingToken == null) {
            redisTemplate.opsForValue().set(key, token);
        }
        log.debug("FCM token saved: {}", token);
    }

    private String getTokenFromRedis(Integer userId) {
        String key = generateFcmKey(userId);
        String token = redisTemplate.opsForValue().get(key);
        if (token == null) {
            throw new CustomException(FCM_TOKEN_NOT_FOUND);
        }
        return token;
    }

    public void sendMessage(Challenge challenge, Integer type) {
        Message message = createMessageWithTopic(challenge, type);

        try {
            String response = FirebaseMessaging.getInstance().send(message);
            log.info("Successfully Sent {} Topic to Subscribers: {}", challenge.getId(), response);
        } catch (FirebaseMessagingException e) {
            log.error("Failed to subscribe tokens to topic {}: {}", e.getMessagingErrorCode(), e.getMessage());
            throw new CustomException(FCM_SEND_FAILED);
        }
    }

    private Message createMessageWithTopic(Challenge challenge, Integer type) {
        FCMMessageDto fcmMessageDto = new FCMMessageDto();
        switch (type) {
            case 1:
                fcmMessageDto.setTitle("[ECOFARMING] 참가하신 챌린지가 시작되었어요!");
                fcmMessageDto.setBody(String.format("%s~%s 동안 %s 번만 열심히 참가해주세요 ☘",
                        challenge.getStartDate(), challenge.getEndDate(), challenge.getFrequency()));
                break;
            case 2:
                fcmMessageDto.setTitle("[ECOFARMING] 참가하신 챌린지가 종료되었어요!");
                fcmMessageDto.setBody("들어와서 상금을 조회해보세요! 🤩");
                break;
            default:
                return null;
        }

        if(fcmMessageDto == null) {
            log.error("지원하지 않는 메세지 타입입니다. {}", type);
            throw new CustomException(FCM_SEND_FAILED);
        }
        return Message.builder()
                .setTopic(challenge.getId().toString())
                .setNotification(createNotification(fcmMessageDto))
                .setWebpushConfig(createWebpushConfig(fcmMessageDto))
                .build();
    }

    private Notification createNotification(FCMMessageDto request) {
        return Notification.builder()
                .setTitle(request.getTitle())
                .setBody(request.getBody())
                .build();
    }

    private WebpushConfig createWebpushConfig(FCMMessageDto request) {
        return WebpushConfig.builder()
                .putHeader("ttl", "300")
                .setNotification(new WebpushNotification(request.getTitle(), request.getBody()))
                .build();
    }

    public void subscribeFromTopic(FCMSubDto fcmSubDto) throws FirebaseMessagingException {
        try {
            log.info("구독 요청 접수 : {}", fcmSubDto.getTopic());
            log.info("구독 요청 토큰 : {}", fcmSubDto.getToken());
            TopicManagementResponse response = FirebaseMessaging.getInstance()
                            .subscribeToTopic(Collections.singletonList(fcmSubDto.getToken()),
                                    fcmSubDto.getTopic());

            log.info("Successfully subscribed {} tokens to topic: {}", response.getSuccessCount(), fcmSubDto.getTopic());
        } catch (FirebaseMessagingException e) {
            log.error("Failed to subscribe tokens to topic {}: {}", e.getMessagingErrorCode(), e.getMessage());
            throw e;
        }
    }

    public void unsubscribeFromTopic(FCMSubDto fcmSubDto) throws FirebaseMessagingException {
        try{
            TopicManagementResponse response = FirebaseMessaging.getInstance()
                            .unsubscribeFromTopic(Collections.singletonList(fcmSubDto.getToken()),
                                    fcmSubDto.getTopic());
            log.info("Successfully unsubscribed {} tokens to topic: {}", response.getSuccessCount(), fcmSubDto.getTopic());
        } catch (FirebaseMessagingException e) {
            log.error("Failed to unsubscribe tokens to topic {}: {}", e.getMessagingErrorCode(), e.getMessage());
            throw e;
        }
    }

    // TEST용 사용하지 않음
    public List<String> getValuesByKeyPattern() {
        List<String> result = new ArrayList<>();

        Set<String> keys = redisTemplate.keys("FCM:*"); // 패턴에 맞는 키 검색
        if (keys != null) {
            keys.forEach(key -> {
                String value = redisTemplate.opsForValue().get(key);
                result.add(value);
            });
        }

        return result;
    }
}

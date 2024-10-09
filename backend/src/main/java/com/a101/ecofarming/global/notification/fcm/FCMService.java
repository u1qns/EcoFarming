package com.a101.ecofarming.global.notification.fcm;

import static com.a101.ecofarming.global.exception.ErrorCode.*;

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
        User user = userRepository.findById(requestDto.getUserId())
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

    public void sendMessage(FCMMessageDto requestDto, String topic) {
        Message message = createMessageWithTopic(requestDto, topic);

        try {
            FirebaseMessaging.getInstance().send(message);
        } catch (FirebaseMessagingException e) {
            throw new CustomException(FCM_SEND_FAILED);
        }
    }

    private Message createMessageWithToken(FCMMessageDto request, String token) {
        return Message.builder()
                .setToken(token)
                .setNotification(createNotification(request))
                .setWebpushConfig(createWebpushConfig(request))
                .build();
    }

    private Message createMessageWithTopic(FCMMessageDto request, String topic) {
        return Message.builder()
                .setTopic(topic)
                .setNotification(createNotification(request))
                .setWebpushConfig(createWebpushConfig(request))
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

    protected void sendMessageWithTopic(String topic) throws FirebaseMessagingException {
        FCMMessageDto requestDto = new FCMMessageDto("Eco Farming", topic.toString());
        Message message = createMessageWithTopic(requestDto, topic);

        try {
            String response = FirebaseMessaging.getInstance().send(message);
            log.info("Successfully Sent {} Topic to Subscribers: {}", topic, response);
        } catch (FirebaseMessagingException e) {
            log.error("Failed to subscribe tokens to topic {}: {}", e.getMessagingErrorCode(), e.getMessage());
            throw e;
        }
    }

    public void subscribeFromTopic(FCMSubDto fcmSubDto) throws FirebaseMessagingException {
        try {
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

package com.a101.ecofarming.global.notification.fcm;

import static com.a101.ecofarming.global.exception.ErrorCode.*;

import com.a101.ecofarming.global.exception.CustomException;
import com.a101.ecofarming.user.entity.User;
import com.a101.ecofarming.user.repository.UserRepository;
import com.google.firebase.messaging.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class FCMService {

    private final UserRepository userRepository;
    private final RedisTemplate<String, String> redisTemplate;

    static final String STR_FCM = "FCM";

    // FireBase 토큰 Redis에 저장
    public ResponseEntity<Void> saveToken(String fcmToken, Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        redisTemplate.opsForValue().set(STR_FCM + user.getId().toString(), fcmToken);
        return ResponseEntity.ok().build();
    }

    public void sendMessage(String targetToken, String title, String body) {
        Message message = Message.builder()
                .setToken(targetToken)
                .setNotification(Notification.builder().setTitle(title).setBody(body).build())
                .build();

        try {
            FirebaseMessaging.getInstance().send(message);
        } catch (FirebaseMessagingException e) {
            throw new CustomException(FCM_SEND_FAILED);
        }
    }

    public ResponseEntity<Void> pushNotification(Integer userId, String content) {
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

            String token = redisTemplate.opsForValue().get(STR_FCM + user.getId().toString());
            if (token == null) {
                throw new CustomException(FCM_TOKEN_NOT_FOUND);
            }

            Message message = Message.builder()
                    .setToken(token)
                    .setWebpushConfig(WebpushConfig.builder()
                            .putHeader("ttl", "300")
                            .setNotification(new WebpushNotification("Eco Farming", content))
                            .build())
                    .build();

            FirebaseMessaging.getInstance().send(message);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            throw new CustomException(FCM_SEND_FAILED);
        }
    }
}

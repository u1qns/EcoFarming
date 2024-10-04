package com.a101.ecofarming.global.security.service;

import com.a101.ecofarming.global.exception.CustomException;
import com.a101.ecofarming.global.security.dto.RefreshToken;
import com.a101.ecofarming.global.security.dto.TokenDto;
import com.a101.ecofarming.global.security.repository.RefreshRepository;
import com.a101.ecofarming.global.security.util.JWTUtil;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

import static com.a101.ecofarming.global.exception.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class ReissueService {

    private final JWTUtil jwtUtil;

    private final RefreshRepository refreshRepository;

    private final RedisTemplate<String, Object> redisTemplate;

    public TokenDto reissueToken(String refreshToken, String oldAccessToken) {

        if (refreshToken == null) {
            throw new CustomException(REFRESH_TOKEN_NULL);
        }

        // expired check
        isExpiredToken(refreshToken);

        // 토큰이 refresh인지 확인
        isValidRefreshToken(refreshToken);

        // DB에 저장되어 있는지 확인
        String email = jwtUtil.getUsername(refreshToken);
        RefreshToken storedToken = refreshRepository.findById(email)
                .orElseThrow(() -> new CustomException(REFRESH_TOKEN_NOT_FOUND));

        if (!storedToken.getRefreshToken().equals(refreshToken)) {
            throw new CustomException(INVALID_REFRESH_TOKEN);
        }

        if (oldAccessToken != null) {
            // 기존 액세스 토큰을 블랙리스트에 추가, 10분간 유지 (600000 밀리초)
            redisTemplate.opsForValue().set(oldAccessToken, "true", 600000L, TimeUnit.MILLISECONDS);
        }

        // email 추출 및 새로운 액세스 토큰 발급
        String newAccess = jwtUtil.createJwt("access", email, 600000L);
        String newRefresh = jwtUtil.createJwt("refresh", email, 86400000L);

        // DB에 기존의 refresh 토큰 삭제 후 새 refresh 토큰 저장
        refreshRepository.save(new RefreshToken(email, newRefresh));

        return new TokenDto(newAccess, newRefresh);
    }

    private void isExpiredToken(String refreshToken) {
        try {
            jwtUtil.isExpired(refreshToken);
        } catch (ExpiredJwtException e) {
            throw new CustomException(REFRESH_TOKEN_EXPIRED);
        }
    }

    private void isValidRefreshToken(String refreshToken) {
        String category = jwtUtil.getCategory(refreshToken);
        if (!category.equals("refresh")) {
            throw new CustomException(INVALID_REFRESH_TOKEN);
        }
    }
}

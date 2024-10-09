package com.a101.ecofarming.global.security.filter;

import com.a101.ecofarming.global.exception.CustomException;
import com.a101.ecofarming.global.security.dto.RefreshToken;
import com.a101.ecofarming.global.security.repository.RefreshRepository;
import com.a101.ecofarming.global.security.util.JWTUtil;
import com.a101.ecofarming.global.security.dto.LoginDto;
import com.a101.ecofarming.user.entity.User;
import com.a101.ecofarming.user.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import java.io.IOException;
import static com.a101.ecofarming.global.exception.ErrorCode.INVALID_INPUT_FORMAT;
import static com.a101.ecofarming.global.exception.ErrorCode.USER_NOT_FOUND;

@RequiredArgsConstructor
public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    private final JWTUtil jwtUtil;

    private final RefreshRepository refreshRepository;

    private final UserRepository userRepository;

    @Override
    public void setFilterProcessesUrl(String filterProcessesUrl) {
        super.setFilterProcessesUrl("/api/login");  // 여기서 필터가 처리할 경로를 /api/login으로 설정
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            // JSON 데이터를 파싱
            ObjectMapper objectMapper = new ObjectMapper();
            LoginDto loginRequest = objectMapper.readValue(request.getInputStream(), LoginDto.class);

            // 이메일과 비밀번호로 인증 토큰 생성
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(), loginRequest.getPassword(), null
            );

            // AuthenticationManager를 통해 인증 처리
            return authenticationManager.authenticate(authToken);

        } catch (IOException e) {
            throw new CustomException(INVALID_INPUT_FORMAT);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException {
        String email = authentication.getName();

        User user = userRepository.findByEmail(email).orElseThrow(() -> new CustomException(USER_NOT_FOUND));


        // 토큰 생성 (10분, 24시간)
        String access = jwtUtil.createJwt("access", email, 86400000L); //TODO 600000L
        String refresh = jwtUtil.createJwt("refresh", email, 86400000L);

        // DB에 저장
        refreshRepository.save(new RefreshToken(email, refresh));

        // 응답 설정
        response.setHeader("Authorization", "Bearer " + access);
        createCookie(response, "refresh", refresh);

        // 유저 이름만 JSON으로 응답
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("{\"username\": \"" + user.getName() + "\", \"userId\": \"" + user.getId() + "\"}");
        response.setStatus(HttpStatus.OK.value());
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed){
        response.setStatus(401);
    }

    private void  createCookie(HttpServletResponse response, String key, String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24 * 60 * 60);  // 쿠키 만료 시간 설정
        cookie.setPath("/");
        cookie.setHttpOnly(true);  // JavaScript에서 접근 불가
        //        cookie.setSecure(true);  // HTTPS에서만 쿠키 전송

        response.addCookie(cookie);
    }
}

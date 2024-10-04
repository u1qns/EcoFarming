package com.a101.ecofarming.global.security.filter;

import com.a101.ecofarming.global.security.dto.CustomUserDetails;
import com.a101.ecofarming.global.security.util.JWTUtil;
import com.a101.ecofarming.user.entity.User;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.io.PrintWriter;

@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;

    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // 헤더에서 access키에 담긴 토큰을 꺼냄
        String authorization = request.getHeader("Authorization");

        // 토큰이 없다면 다음 필터로 넘김
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String accessToken = authorization.split(" ")[1];

        // Redis에서 블랙리스트 확인
        Boolean isBlacklisted = (Boolean) redisTemplate.opsForValue().get(accessToken);
        if (Boolean.TRUE.equals(isBlacklisted)) {
            // 블랙리스트에 등록된 토큰이면 401 반환
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        String requestUri = request.getRequestURI();
        if (requestUri.equals("/api/reissue")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 토큰 만료 여부 확인, 만료시 다음 필터로 넘기지 않음
        try {
            jwtUtil.isExpired(accessToken);
        } catch (ExpiredJwtException e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("text/plain");
            PrintWriter writer = response.getWriter();
            writer.print("access token expired");
            return;
        }

        // 토큰이 access인지 확인 (발급시 페이로드에 명시)
        String category = jwtUtil.getCategory(accessToken);

        if (!category.equals("access")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("text/plain");
            PrintWriter writer = response.getWriter();
            writer.print("invalid access token");
            return;
        }

        // username, role 값을 획득
        String email = jwtUtil.getUsername(accessToken);

        User user = User.builder()
                .email(email)
                .build();

        CustomUserDetails customUserDetails = new CustomUserDetails(user);

        Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, null);
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }
}

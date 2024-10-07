package com.a101.ecofarming.global.security.config;

import com.a101.ecofarming.global.security.filter.CustomLogoutFilter;
import com.a101.ecofarming.global.security.filter.JWTFilter;
import com.a101.ecofarming.global.security.filter.LoginFilter;
import com.a101.ecofarming.global.security.repository.RefreshRepository;
import com.a101.ecofarming.global.security.util.JWTUtil;
import com.a101.ecofarming.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final AuthenticationConfiguration authenticationConfiguration;

    private final JWTUtil jwtUtil;

    private final RefreshRepository refreshRepository;

    private final RedisTemplate<String, Object> redisTemplate;

    private final UserRepository userRepository;
    
    // 비밀번호 암호화
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        
        http
                .cors((cors) -> cors
                        .configurationSource(request -> {
                            CorsConfiguration configuration = new CorsConfiguration();

                            // 프론트 주소
                            configuration.setAllowedOrigins(Arrays.asList("https://j11a101.p.ssafy.io", "http://localhost:3000"));
                            configuration.setAllowedMethods(Collections.singletonList("*"));
                            configuration.setAllowCredentials(true);
                            configuration.setAllowedHeaders(Collections.singletonList("*"));
                            configuration.setMaxAge(3600L);
                            configuration.setExposedHeaders(Arrays.asList("Authorization", "Set-Cookie"));

                            return configuration;
                        }));

        http
                .csrf(AbstractHttpConfigurer::disable) // csrf(session이 stateless여서 disable)
                .formLogin(AbstractHttpConfigurer::disable) //form 로그인 disable
                .httpBasic(AbstractHttpConfigurer::disable) // http basic 인증 방식 disable

                // 경로 별 인가 작업
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers("/", "/login", "/join", "/challenges", "/reissue").permitAll()
                        .anyRequest().authenticated())

                .addFilterBefore(new JWTFilter(jwtUtil, redisTemplate), LoginFilter.class)

                .addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil, refreshRepository, userRepository), UsernamePasswordAuthenticationFilter.class)

                .addFilterBefore(new CustomLogoutFilter(jwtUtil, refreshRepository), LogoutFilter.class)

                //세션 설정(Stateless)
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}

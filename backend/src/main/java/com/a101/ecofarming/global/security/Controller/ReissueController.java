package com.a101.ecofarming.global.security.Controller;

import com.a101.ecofarming.global.security.dto.TokenDto;
import com.a101.ecofarming.global.security.service.ReissueService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ReissueController {

    private final ReissueService reissueService;

    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {
        String authorizationHeader = request.getHeader("Authorization");

        String oldAccessToken = null;
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            oldAccessToken = authorizationHeader.split(" ")[1];
        }

        //get refresh token
        String refreshToken = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refresh")) {
                    refreshToken = cookie.getValue();
                }
            }
        }

        TokenDto newTokens = reissueService.reissueToken(refreshToken, oldAccessToken);

        // 새로운 토큰을 헤더에 추가
        response.setHeader("Authorization", "Bearer " + newTokens.getAccessToken());
        response.addCookie(createCookie("refresh", newTokens.getRefreshToken()));

        return new ResponseEntity<>(HttpStatus.OK);
    }

    private Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24*60*60);
        //cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setHttpOnly(true);

        return cookie;
    }
}

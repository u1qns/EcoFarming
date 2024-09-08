package com.a101.ecofarming.user.controller;

import com.a101.ecofarming.user.dto.response.AmountResponseDto;
import com.a101.ecofarming.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{userId}/my-page")
    public ResponseEntity<?> findUserMyPage(@PathVariable("userId") Integer userId){
        AmountResponseDto response = userService.findUserMyPage(userId);

        return ResponseEntity.ok(response);
    }
}

package com.a101.ecofarming.user.controller;

import com.a101.ecofarming.user.dto.request.JoinRequestDto;
import com.a101.ecofarming.user.dto.response.MyComplaintsResponseDto;
import com.a101.ecofarming.user.dto.response.MyPageResponseDto;
import com.a101.ecofarming.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/users/my-page")
    public ResponseEntity<?> findUserMyPage(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        MyPageResponseDto response = userService.findUserMyPage(email);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/users/{userId}/my-page/complaints")
    public ResponseEntity<?> getMyComplaints(@PathVariable("userId") Integer userId) {
        List<MyComplaintsResponseDto> response = userService.getMyComplaints(userId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody JoinRequestDto request){
        userService.join(request);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}

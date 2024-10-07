package com.a101.ecofarming.user.controller;

import com.a101.ecofarming.user.dto.request.JoinRequestDto;
import com.a101.ecofarming.user.dto.response.MyComplaintsResponseDto;
import com.a101.ecofarming.user.dto.response.MyPageResponseDto;
import com.a101.ecofarming.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/users/my-page")
    public ResponseEntity<?> findUserMyPage(){
        MyPageResponseDto response = userService.findUserMyPage();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/users/my-page/complaints")
    public ResponseEntity<?> getMyComplaints() {
        List<MyComplaintsResponseDto> response = userService.getMyComplaints();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody JoinRequestDto request){
        userService.join(request);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}

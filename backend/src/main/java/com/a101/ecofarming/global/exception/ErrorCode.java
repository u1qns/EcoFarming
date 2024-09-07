package com.a101.ecofarming.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    // 해당 형식으로 추가하면 사용 가능
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "유저 정보가 없습니다.")
    ;

    private final HttpStatus httpStatus;
    private final String message;
}

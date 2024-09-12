package com.a101.ecofarming.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    // 해당 형식으로 추가하면 사용 가능
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 유저입니다."),
    PROOF_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 인증입니다."),
    FILE_NAME_NULL(HttpStatus.BAD_REQUEST, "파일 이름이 null입니다."),
    FILE_UPLOAD_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드 중 오류가 발생했습니다."),
    CHALLENGE_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 챌린지입니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;
}

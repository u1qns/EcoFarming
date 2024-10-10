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
    BALANCE_GAME_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 밸런스 게임입니다."),
    CATEGORY_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 카테고리 입니다."),
    CHALLENGE_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 챌린지입니다."),
    PAYMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 결제입니다"),
    CHALLENGE_USER_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 챌린지유저입니다."),
    COMPLATINT_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 신고입니다."),

    INVALID_INPUT_FORMAT(HttpStatus.BAD_REQUEST, "잘못된 입력 형식입니다."),
    REFRESH_TOKEN_NULL(HttpStatus.BAD_REQUEST, "refresh token이 null입니다."),
    REFRESH_TOKEN_EXPIRED(HttpStatus.BAD_REQUEST, "refresh token이 만료되었습니다."),
    INVALID_REFRESH_TOKEN(HttpStatus.BAD_REQUEST, "유효하지 않은 refresh token 입니다."),
    REFRESH_TOKEN_NOT_FOUND(HttpStatus.BAD_REQUEST, "refresh token을 찾을 수 없습니다."),
    EMAIL_ALREADY_EXIST(HttpStatus.CONFLICT, "이미 존재하는 이메일입니다."),
    PROOF_ALREADY_EXIST(HttpStatus.CONFLICT, "이미 존재하는 인증샷입니다."),

    // FILE UPLOAD
    FILE_NAME_NULL(HttpStatus.BAD_REQUEST, "파일 이름이 null입니다."),
    FILE_UPLOAD_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드 중 오류가 발생했습니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;
}

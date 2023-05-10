package com.ownsong.exception;

public enum ErrorCode {


    // Global
    INVALID_INPUT_VALUE(400, "G001", "Invalid Input Value"),
    ACCESS_Unauthorized(401, "G002", "유효한 인증 정보가 아닙니다"),
    ACCESS_Forbidden(403, "G003", "해당 권한이 없습니다."),
    PAGE_NOT_FOUND(404, "G004", "잘못된 경로입니다."),
    METHOD_NOT_ALLOWED(405, "G005", "Invalid Input Value"),
    INTERNAL_SERVER_ERROR(500, "G006", "Internal Server Error");

    private final String code;
    private final String message;
    private int status;

    ErrorCode(final int status, final String code, final String message) {
        this.code = code;
        this.message = message;
        this.status = status;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public int getStatus() {
        return status;
    }
}

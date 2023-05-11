package com.ownsong.exception.customException;

import com.ownsong.exception.BusinessException;
import com.ownsong.exception.ErrorCode;

public class BoardException extends BusinessException {
    public BoardException(String message, ErrorCode errorCode) {
        super(message, errorCode);
    }

    public BoardException(ErrorCode errorCode) {
        super(errorCode);
    }
}

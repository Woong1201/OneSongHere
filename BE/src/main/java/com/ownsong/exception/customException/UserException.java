package com.ownsong.exception.customException;

import com.ownsong.exception.BusinessException;
import com.ownsong.exception.ErrorCode;

public class UserException extends BusinessException {
    public UserException(String message, ErrorCode errorCode) {
        super(message, errorCode);
    }

    public UserException(ErrorCode errorCode) {
        super(errorCode);
    }
}

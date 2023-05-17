package com.ownsong.exception.customException;

import com.ownsong.exception.BusinessException;
import com.ownsong.exception.ErrorCode;

public class RelayStudioException extends BusinessException {

    public RelayStudioException(String message, ErrorCode errorCode) {
        super(message, errorCode);
    }

    public RelayStudioException(ErrorCode errorCode) {
        super(errorCode);
    }
}

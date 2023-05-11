package com.ownsong.exception.customException;

import com.ownsong.exception.BusinessException;
import com.ownsong.exception.ErrorCode;

public class AlbumException extends BusinessException {
    public AlbumException(String message, ErrorCode errorCode) {
        super(message, errorCode);
    }

    public AlbumException(ErrorCode errorCode) {
        super(errorCode);
    }
}

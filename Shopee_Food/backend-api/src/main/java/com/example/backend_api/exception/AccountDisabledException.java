package com.example.backend_api.exception;

/**
 * Exception khi tài khoản bị vô hiệu hóa
 */
public class AccountDisabledException extends RuntimeException {
    
    public AccountDisabledException(String message) {
        super(message);
    }
    
    public AccountDisabledException(String message, Throwable cause) {
        super(message, cause);
    }
}

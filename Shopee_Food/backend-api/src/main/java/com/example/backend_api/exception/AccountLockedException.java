package com.example.backend_api.exception;

/**
 * Exception khi tài khoản bị khóa
 */
public class AccountLockedException extends RuntimeException {
    
    public AccountLockedException(String message) {
        super(message);
    }
    
    public AccountLockedException(String message, Throwable cause) {
        super(message, cause);
    }
}

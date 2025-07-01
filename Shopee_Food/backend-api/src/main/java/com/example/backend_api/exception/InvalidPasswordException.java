package com.example.backend_api.exception;

/**
 * Exception khi password không đúng
 */
public class InvalidPasswordException extends RuntimeException {
    
    public InvalidPasswordException(String message) {
        super(message);
    }
    
    public InvalidPasswordException(String message, Throwable cause) {
        super(message, cause);
    }
}

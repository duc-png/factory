package com.example.backend_api.model.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {

    @Builder.Default
    private boolean success = false;

    private String message;
    private String errorCode;
    private int status;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();

    private String path;
    private Object details;
    private List<ValidationError> validationErrors;
    private Map<String, Object> metadata;

    // Static factory methods
    public static ErrorResponse of(String message) {
        return ErrorResponse.builder()
                .message(message)
                .build();
    }

    public static ErrorResponse of(String message, String errorCode) {
        return ErrorResponse.builder()
                .message(message)
                .errorCode(errorCode)
                .build();
    }

    public static ErrorResponse of(String message, String errorCode, int status) {
        return ErrorResponse.builder()
                .message(message)
                .errorCode(errorCode)
                .status(status)
                .build();
    }

    public static ErrorResponse of(String message, String errorCode, int status, String path) {
        return ErrorResponse.builder()
                .message(message)
                .errorCode(errorCode)
                .status(status)
                .path(path)
                .build();
    }

    public static ErrorResponse validation(String message, List<ValidationError> validationErrors) {
        return ErrorResponse.builder()
                .message(message)
                .errorCode("VALIDATION_ERROR")
                .status(400)
                .validationErrors(validationErrors)
                .build();
    }

    // Inner class for validation errors
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class ValidationError {
        private String field;
        private Object rejectedValue;
        private String message;
        private String code;

        // Static factory methods
        public static ValidationError of(String field, Object rejectedValue, String message) {
            return ValidationError.builder()
                    .field(field)
                    .rejectedValue(rejectedValue)
                    .message(message)
                    .build();
        }

        public static ValidationError of(String field, String message, String code) {
            return ValidationError.builder()
                    .field(field)
                    .message(message)
                    .code(code)
                    .build();
        }
    }
}
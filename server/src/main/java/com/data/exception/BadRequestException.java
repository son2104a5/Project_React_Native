package com.data.exception;

import lombok.Getter;

import java.util.Map;

@Getter
public class BadRequestException extends RuntimeException {
    private final Map<String, String> errors;

    public BadRequestException(String message, Map<String, String> errors) {
        super(message);
        this.errors = errors;
    }
}
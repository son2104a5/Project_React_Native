package com.data.exception;

import com.data.model.dto.res.APIResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<APIResponse<Object>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(err ->
            errors.put(err.getField(), err.getDefaultMessage())
        );

        return ResponseEntity.badRequest().body(
                new APIResponse<>(false, "Lỗi dữ liệu đầu vào", null, errors, LocalDateTime.now())
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<APIResponse<Object>> handleAllExceptions(Exception ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("error", ex.getMessage());

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new APIResponse<>(false, "Lỗi hệ thống", null, errors, LocalDateTime.now())
        );
    }
}
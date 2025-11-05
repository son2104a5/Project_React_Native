package com.data.model.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class APIResponse<T> {
    private boolean success;
    private String message;
    private T data;
    private Object errors;
    private LocalDateTime timestamp;
}
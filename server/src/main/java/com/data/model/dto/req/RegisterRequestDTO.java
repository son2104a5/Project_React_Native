package com.data.model.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "User registration request")
public class RegisterRequestDTO {
    @NotBlank(message = "Mật khẩu không được để trống")
    @Schema(description = "User password", example = "password123", required = true)
    private String password;
    
    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không đúng định dạng")
    @Schema(description = "User email address", example = "user@example.com", required = true)
    private String email;
    
    @NotBlank(message = "Số điện thoại không được để trống")
    @Schema(description = "User phone number", example = "0123456789", required = true)
    private String phone;
    
    @NotBlank(message = "Hãy viết tên đầy đủ của bạn")
    @Schema(description = "User full name", example = "John Doe", required = true)
    private String fullName;
    
    @Schema(description = "User date of birth", example = "1990-01-01", nullable = true)
    private LocalDate dateOfBirth;
}
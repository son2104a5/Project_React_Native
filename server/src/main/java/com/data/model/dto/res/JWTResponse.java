
package com.data.model.dto.res;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Schema(description = "JWT Response containing tokens and user information")
public class JWTResponse {
    @Schema(description = "User's full name", example = "John Doe")
    private String fullName;
    
    @Schema(description = "User's email address", example = "john@example.com")
    private String email;
    
    @Schema(description = "User's phone number", example = "0123456789")
    private String phone;
    
    @Schema(description = "User account enabled status", example = "true")
    private Boolean enabled;
    
    @JsonIgnore
    @Schema(description = "User authorities", hidden = true, accessMode = Schema.AccessMode.READ_ONLY)
    private Collection<? extends GrantedAuthority> authorities;
    
    @Schema(description = "JWT Access Token", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    private String accessToken;
    
    @Schema(description = "JWT Refresh Token", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    private String refreshToken;
}

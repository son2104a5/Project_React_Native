
package com.data.controller;

import com.data.model.dto.req.LoginRequestDTO;
import com.data.model.dto.req.RegisterRequestDTO;
import com.data.model.dto.res.APIResponse;
import com.data.model.dto.res.JWTResponse;
import com.data.service.IAuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "API endpoints for user authentication")
public class AuthController {
    private final IAuthService authService;

    @Operation(summary = "Register a new user", description = "Create a new user account and return JWT tokens")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User registered successfully", content = @Content(schema = @Schema(implementation = APIResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data")
    })
    @PostMapping("/register")
    public ResponseEntity<APIResponse<JWTResponse>> register(@Valid @RequestBody RegisterRequestDTO user) {
        JWTResponse jwtResponse = authService.register(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new APIResponse<>(true, "Đăng kí người dùng thành công.",
                        jwtResponse, null, LocalDateTime.now()));
    }

    @Operation(summary = "Login user", description = "Authenticate user and return JWT tokens")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User logged in successfully", content = @Content(schema = @Schema(implementation = APIResponse.class))),
            @ApiResponse(responseCode = "401", description = "Invalid credentials")
    })
    @PostMapping("/login")
    public ResponseEntity<APIResponse<JWTResponse>> login(@Valid @RequestBody LoginRequestDTO user,
                                                          HttpSession session) {
        JWTResponse jwtResponse = authService.login(user);
        session.setAttribute("user", jwtResponse);
        return ResponseEntity.ok(new APIResponse<>(true, "Đăng nhập thành công", jwtResponse, null,
                LocalDateTime.now()));
    }

    @Operation(summary = "Logout user", description = "Clear user session")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "User logged out successfully")
    })
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpSession session) {
        session.removeAttribute("user");
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping
    public ResponseEntity<APIResponse<?>> getUsers() {
        return ResponseEntity.ok(APIResponse.builder()
                .message("Success")
                .success(true)
                .data(authService.getUsers())
                .build());
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(HttpServletRequest request) {
        return ResponseEntity.ok(APIResponse.builder()
                .message("Success")
                .success(true)
                .data(authService.getCurrentUser(request))
                .build());
    }
}


package com.data.controller;

import com.data.model.dto.req.LoginRequestDTO;
import com.data.model.dto.req.RegisterRequestDTO;
import com.data.model.dto.res.APIResponse;
import com.data.model.dto.res.JWTResponse;
import com.data.service.AuthService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public Object register(@Valid @RequestBody RegisterRequestDTO user) {
        JWTResponse jwtResponse = authService.register(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new APIResponse<>(true, "Đăng kí người dùng thành công.",
                        jwtResponse, null, LocalDateTime.now()));
    }

    @PostMapping("/login")
    public Object login(@Valid @RequestBody LoginRequestDTO user, HttpSession session) {
        JWTResponse jwtResponse = authService.login(user);
        session.setAttribute("user", jwtResponse);
        return ResponseEntity.ok(new APIResponse<>(true, "Đăng nhập thành công", jwtResponse, null, LocalDateTime.now()));
    }

    @PostMapping("/logout")
    public Object logout(HttpSession session) {
        session.removeAttribute("user");
        return ResponseEntity.status(HttpStatus.NO_CONTENT);
    }
}

package com.data.service;
import com.data.model.dto.req.LoginRequestDTO;
import com.data.model.dto.req.RegisterRequestDTO;
import com.data.model.dto.res.JWTResponse;
import com.data.model.entity.User;

import java.io.IOException;

public interface AuthService {
    JWTResponse register(RegisterRequestDTO registerRequestDTO);
    JWTResponse login(LoginRequestDTO loginRequestDTO);
//    void verify(User user, String otp);
//    User changePassword(PasswordChangeDTO passwordChangeDTO, User user);
//    User changeProfile(UserDTO userDTO, User user) throws IOException;
}
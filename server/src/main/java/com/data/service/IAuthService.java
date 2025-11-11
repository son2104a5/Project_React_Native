package com.data.service;
import com.data.model.dto.req.LoginRequestDTO;
import com.data.model.dto.req.RegisterRequestDTO;
import com.data.model.dto.res.JWTResponse;
import com.data.model.entity.User;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface IAuthService {
    JWTResponse register(RegisterRequestDTO registerRequestDTO);
    JWTResponse login(LoginRequestDTO loginRequestDTO);
    List<User> getUsers();
    User getCurrentUser(HttpServletRequest request);
//    void verify(User user, String otp);
//    User changePassword(PasswordChangeDTO passwordChangeDTO, User user);
//    User changeProfile(UserDTO userDTO, User user) throws IOException;
}
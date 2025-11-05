package com.data.service.impl;

import com.data.exception.BadRequestException;
import com.data.model.dto.req.LoginRequestDTO;
import com.data.model.dto.req.RegisterRequestDTO;
import com.data.model.dto.res.JWTResponse;
import com.data.model.entity.User;
import com.data.model.enums.UserRole;
import com.data.model.enums.UserStatus;
import com.data.repository.RoleRepository;
import com.data.repository.UserRepository;
import com.data.security.jwt.JwtUtils;
import com.data.security.principle.CustomUserDetails;
import com.data.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
//    private final JavaMailSender mailSender;
//    private final CloudinaryService cloudinaryService;

    @Override
    public JWTResponse register(RegisterRequestDTO registerRequestDTO) {
        // Kiểm tra trùng email
        if (userRepository.findByEmail(registerRequestDTO.getEmail()).isPresent()) {
            Map<String, String> errors = new HashMap<>();
            errors.put("email", "Email đã tồn tại");
            throw new BadRequestException("Không thể đăng kí do email này đã tồn tại", errors);
        }

        // Kiểm tra trùng phone
        if (userRepository.findByPhone(registerRequestDTO.getPhone()).isPresent()) {
            Map<String, String> errors = new HashMap<>();
            errors.put("phone", "Số điện thoại đã tồn tại");
            throw new BadRequestException("Không thể đăng kí do số điện thoại đã tồn tại", errors);
        }

        // Tạo mã OTP
//        String otp = generateOTP();
//        LocalDateTime otpExpiration = LocalDateTime.now().plusMinutes(5);

        User user = User.builder()
                .password(passwordEncoder.encode(registerRequestDTO.getPassword()))
                .email(registerRequestDTO.getEmail())
                .phone(registerRequestDTO.getPhone())
                .fullName(registerRequestDTO.getFullName())
                .avatarUrl("https://i.pinimg.com/736x/bc/43/98/bc439871417621836a0eeea768d60944.jpg")
                .createdAt(LocalDateTime.now())
                .updatedAt(null)
                .status(UserStatus.ACTIVE)
                .role(roleRepository.findByRoleName(UserRole.USER))
                .build();

        CustomUserDetails userDetails = CustomUserDetails.builder()
                .password(user.getPassword())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .enabled(user.getStatus().equals(UserStatus.ACTIVE))
                .authorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().getRoleName())))
                .build();

        userRepository.save(user);

        // Tạo token JWT
        String token = jwtUtils.generateToken(userDetails.getUsername());

        return JWTResponse.builder()
                .username(userDetails.getUsername())
                .fullName(userDetails.getFullName())
                .email(userDetails.getEmail())
                .phone(userDetails.getPhone())
                .enabled(userDetails.isEnabled())
                .authorities(userDetails.getAuthorities())
                .token(token)
                .build();
    }

    @Override
    public JWTResponse login(LoginRequestDTO loginRequestDTO) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequestDTO.getEmail(),
                            loginRequestDTO.getPassword()
                    )
            );
            User user = userRepository.findByEmail(loginRequestDTO.getEmail())
                    .orElseThrow(() -> new BadCredentialsException("Không tìm thấy người dùng"));

            if (user.getRole() == null || user.getRole().getRoleName() == null) {
                throw new RuntimeException("Người dùng này chưa có vai trò");
            }

            if (!user.getStatus().equals(UserStatus.ACTIVE) && !user.getStatus().equals(UserStatus.INACTIVE)) {
                throw new RuntimeException("Tài khoản này đã bị khóa");
            }

            CustomUserDetails userDetails = CustomUserDetails.builder()
                    .password(user.getPassword())
                    .fullName(user.getFullName())
                    .email(user.getEmail())
                    .phone(user.getPhone())
                    .enabled(user.getStatus().equals(UserStatus.ACTIVE))
                    .authorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().getRoleName())))
                    .build();

            String token = jwtUtils.generateToken(userDetails.getUsername());

            return JWTResponse.builder()
                    .username(userDetails.getUsername())
                    .fullName(userDetails.getFullName())
                    .email(userDetails.getEmail())
                    .phone(userDetails.getPhone())
                    .enabled(userDetails.isEnabled())
                    .authorities(userDetails.getAuthorities())
                    .token(token)
                    .build();
        } catch (BadCredentialsException e) {
            log.error("Sai email hoặc mật khẩu: {}", loginRequestDTO.getEmail(), e);
            throw new BadCredentialsException("Sai email hoặc mật khẩu");
        } catch (Exception e) {
            log.error("Lỗi trong quá trình đăng nhập: {}", e.getMessage(), e);
            throw new RuntimeException("Lỗi đăng nhập: " + e.getMessage());
        }
    }
//
//    @Override
//    public void verify(User user, String otp) {
//        User currentUser = userRepository.findByEmail(user.getEmail())
//                .orElseThrow(() -> {
//                    Map<String, String> errors = new HashMap<>();
//                    errors.put("email", "Không tìm thấy người dùng có email: " + user.getEmail());
//                    return new BadRequestException("Xác thực thất bại", errors);
//                });
//
//        if (currentUser.isVerify()) {
//            Map<String, String> errors = new HashMap<>();
//            errors.put("verify", "Người dùng đã được xác thực");
//            throw new BadRequestException("Xác thực thất bại", errors);
//        }
//
//        if (currentUser.getOtp() == null || !currentUser.getOtp().equals(otp)) {
//            Map<String, String> errors = new HashMap<>();
//            errors.put("otp", "Mã OTP không hợp lệ");
//            throw new BadRequestException("Xác thực thất bại", errors);
//        }
//
//        if (currentUser.getOtpExpiration().isBefore(LocalDateTime.now())) {
//            Map<String, String> errors = new HashMap<>();
//            errors.put("otp", "Mã OTP đã hết hạn");
//            throw new BadRequestException("Xác thực thất bại", errors);
//        }
//
//        currentUser.setVerify(true);
//        currentUser.setOtp(null);
//        currentUser.setOtpExpiration(null);
//        currentUser.setUpdatedAt(LocalDateTime.now());
//        userRepository.save(currentUser);
//    }
//
//    @Override
//    public User changePassword(PasswordChangeDTO passwordChangeDTO, User user) {
//        if (passwordChangeDTO.getOldPassword().equals(passwordChangeDTO.getNewPassword())) {
//            throw new RuntimeException("Mật khẩu mới phải khác mật khẩu hiện tại");
//        }
//        if (!passwordChangeDTO.getConfirmNewPassword().equals(passwordChangeDTO.getNewPassword())) {
//            throw new RuntimeException("Mật khẩu xác thực cần giống mật khẩu mới");
//        }
//        user.setPassword(passwordChangeDTO.getNewPassword());
//        return userRepository.save(user);
//    }
//
//    @Override
//    public User changeProfile(UserDTO userDTO, User user) throws IOException {
//        if (userRepository.findByUsername(userDTO.getUsername()).isPresent()) {
//            throw new RuntimeException("Username đã tồn tại");
//        } else {
//            user.setUsername(userDTO.getUsername());
//        }
//
//        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
//            throw new RuntimeException("Email đã tồn tại");
//        } else {
//            user.setEmail(userDTO.getEmail());
//        }
//
//        if (userRepository.findByPhone(userDTO.getPhone()).isPresent()) {
//            throw new RuntimeException("Số điện thoại bị trùng");
//        } else {
//            user.setPhone(userDTO.getPhone());
//        }
//
//        user.setAddress(userDTO.getAddress());
//        user.setFullName(userDTO.getFullName());
//
//        if (userDTO.getAvatar() != null && !userDTO.getAvatar().isEmpty()) {
//            String imageUrl = cloudinaryService.uploadFile(userDTO.getAvatar());
//            user.setAvatar(imageUrl);
//        }
//
//        user.setUpdatedAt(LocalDateTime.now());
//
//        return userRepository.save(user);
//    }
//
//    private String generateOTP() {
//        Random random = new Random();
//        int otp = 100000 + random.nextInt(900000);
//        return String.valueOf(otp);
//    }
//
//    private void sendOTPEmail(String email, String otp) {
//        try {
//            MimeMessage message = mailSender.createMimeMessage();
//            MimeMessageHelper helper = new MimeMessageHelper(message, true);
//            helper.setTo(email);
//            helper.setSubject("Xác thực tài khoản - Mã OTP");
//            helper.setText("Mã OTP của bạn là: <b>" + otp + "</b>. Mã này có hiệu lực trong 5 phút.", true);
//            mailSender.send(message);
//            log.info("Đã gửi OTP tới email: {}", email);
//        } catch (Exception e) {
//            log.error("Lỗi khi gửi email OTP: {}", e.getMessage(), e);
//            throw new RuntimeException("Không thể gửi email OTP");
//        }
//    }
}
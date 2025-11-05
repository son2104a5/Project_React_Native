package com.data.security.principle;

import com.data.model.entity.User;
import com.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy tài khoản: " + email));

        if (user.getRole() == null || user.getRole().getRoleName() == null) {
            throw new RuntimeException("User role is not defined");
        }

        return CustomUserDetails.builder()
                .password(user.getPassword())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .authorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().getRoleName())))
                .build();
    }
}
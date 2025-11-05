package com.data.model.entity;

import com.data.model.enums.UserGender;
import com.data.model.enums.UserRole;
import com.data.model.enums.UserStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Column(unique = true, nullable = false)
    private String email;

    private String phone;

    private String password;

    private LocalDate dateOfBirth;

    private UserGender gender;

    private String avatarUrl;

    @Enumerated(EnumType.STRING)
    private UserStatus status = UserStatus.ACTIVE;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;
}

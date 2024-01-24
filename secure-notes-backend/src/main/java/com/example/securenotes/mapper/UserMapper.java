package com.example.securenotes.mapper;

import com.example.securenotes.domain.AppUser;
import com.example.securenotes.dto.RegisterUserRequest;
import com.example.securenotes.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class UserMapper {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AppUser mapRegisterUserToUser(RegisterUserRequest registerUserRequest) {
        return AppUser.builder()
                .email(registerUserRequest.email())
                .password(passwordEncoder.encode(registerUserRequest.password()))
                .build();
    }
}

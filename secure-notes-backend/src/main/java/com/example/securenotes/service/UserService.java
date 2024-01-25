package com.example.securenotes.service;

import com.example.securenotes.dto.RegisterUserRequest;
import com.example.securenotes.mapper.UserMapper;
import com.example.securenotes.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private static final int MAX_LOGIN_ATTEMPTS = 3;

    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final PasswordValidatorService passwordValidatorService;

    @Transactional
    public void register(RegisterUserRequest registerUserRequest) {
        validateIfEmailDoesntExist(registerUserRequest.email());
        passwordValidatorService.validatePassword(registerUserRequest.password());

        final var user = userMapper.mapRegisterUserToUser(registerUserRequest);
        userRepository.save(user);
    }

    @Transactional
    public void resetFailedLoginAttempts(String email) {
        final var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        user.setFailedLoginAttempts(0);
        userRepository.save(user);
    }

    @Transactional
    public void incrementFailedLoginAttempts(String email) {
        final var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        user.setFailedLoginAttempts(user.getFailedLoginAttempts() + 1);
        if (user.getFailedLoginAttempts() >= MAX_LOGIN_ATTEMPTS) {
            user.setIsAccountLocked(true);
            System.out.println("Account " + user.getEmail() + " locked");
        }
        userRepository.save(user);
    }

    private void validateIfEmailDoesntExist(String email) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already exists");
        }
    }
}

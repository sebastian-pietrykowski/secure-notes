package com.example.securenotes.service;

import com.example.securenotes.dto.RegisterUserRequest;
import com.example.securenotes.mapper.UserMapper;
import com.example.securenotes.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserMapper userMapper;
    private final UserRepository userRepository;

    @Transactional
    public void register(RegisterUserRequest registerUserRequest) {
        final var user = userMapper.mapRegisterUserToUser(registerUserRequest);
        userRepository.save(user);
    }
}

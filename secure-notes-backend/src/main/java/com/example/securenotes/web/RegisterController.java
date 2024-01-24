package com.example.securenotes.web;

import com.example.securenotes.dto.RegisterUserRequest;
import com.example.securenotes.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/auth/register")
public class RegisterController {
    private final UserService userService;

    @PostMapping
    ResponseEntity<Void> createUser(@RequestBody @Valid RegisterUserRequest registerUserRequest) {
        userService.register(registerUserRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}

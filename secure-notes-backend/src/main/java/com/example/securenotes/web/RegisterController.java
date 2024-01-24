package com.example.securenotes.web;

import com.example.securenotes.dto.CreateNoteRequest;
import com.example.securenotes.dto.RegisterUserRequest;
import com.example.securenotes.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*") // TODO
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/auth/register1")
public class RegisterController {
    private final UserService userService;

    @PostMapping
    ResponseEntity<Void> createUser(@RequestBody @Valid RegisterUserRequest registerUserRequest) {
        userService.register(registerUserRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}

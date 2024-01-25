package com.example.securenotes.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public record RegisterUserRequest(
        @NotEmpty(message = "Email cannot be null") @Email(message = "Incorrect email format") String email,
        @NotBlank(message = "Password cannot be blank") String password
) {
}

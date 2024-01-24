package com.example.securenotes.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public record CreateUserRequest(
        @NotEmpty @Email String email,
        @NotEmpty String password
) {
}

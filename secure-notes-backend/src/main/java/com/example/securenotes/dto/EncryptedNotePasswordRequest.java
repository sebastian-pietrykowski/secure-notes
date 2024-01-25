package com.example.securenotes.dto;


import jakarta.validation.constraints.NotBlank;

public record EncryptedNotePasswordRequest(
        @NotBlank(message = "Password cannot be blank") String password
) {
}

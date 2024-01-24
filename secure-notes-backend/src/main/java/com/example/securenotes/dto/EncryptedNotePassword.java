package com.example.securenotes.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record EncryptedNotePassword(
        @NotBlank String password
) {
}

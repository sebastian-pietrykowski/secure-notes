package com.example.securenotes.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record CreateNoteRequest(
        @NotBlank(message = "Title cannot be blank") String title,
        @NotBlank(message = "Content cannot be blank") String content,
        @NotBlank(message = "Creator cannot be blank") String creator,
        @NotNull(message = "IsEncrypted cannot be null") Boolean isEncrypted,
        String password
) {
}

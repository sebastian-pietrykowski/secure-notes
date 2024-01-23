package com.example.securenotes.dto;

import lombok.Builder;

@Builder
public record NoteResource(
        String id,
        String title,
        String content,
        String creator,
        Boolean isEncrypted
) {
}

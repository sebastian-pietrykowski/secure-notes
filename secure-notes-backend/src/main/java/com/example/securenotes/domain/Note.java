package com.example.securenotes.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotNull(message = "Title cannot be null")
    @Column(nullable = false)
    private String title;

    @NotNull(message = "Content cannot be null")
    @Column(nullable = false)
    private String content;

    @NotNull(message = "Creator cannot be null")
    @Column(nullable = false)
    private String creator;

    @NotNull(message = "IsEncrypted cannot be null")
    @Column(nullable = false)
    private Boolean isEncrypted;

    private String password;
}

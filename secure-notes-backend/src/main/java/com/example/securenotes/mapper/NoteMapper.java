package com.example.securenotes.mapper;

import com.example.securenotes.domain.Note;
import com.example.securenotes.dto.CreateNoteRequest;
import com.example.securenotes.dto.NoteResource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class NoteMapper {
    public NoteResource mapNoteToNoteResource(Note note) {
        return NoteResource.builder()
                .id(note.getId().toString())
                .title(note.getTitle())
                .content(note.getContent())
                .creator(note.getCreator())
                .isEncrypted(note.getIsEncrypted())
                .build();
    }

    public Note mapCreateNoteRequestToNote(CreateNoteRequest createNoteRequest) {
        return Note.builder()
                .title(createNoteRequest.title())
                .content(createNoteRequest.content())
                .creator(createNoteRequest.creator())
                .isEncrypted(createNoteRequest.isEncrypted())
                .password(createNoteRequest.password())
                .build();
    }

    public NoteResource mapEncryptedNoteToPartialNoteResource(Note note) {
        return NoteResource.builder()
                .id(note.getId().toString())
                .title(note.getTitle())
                .content("Encrypted")
                .creator(note.getCreator())
                .isEncrypted(note.getIsEncrypted())
                .build();
    }
}

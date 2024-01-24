package com.example.securenotes.web;

import com.example.securenotes.dto.CreateNoteRequest;
import com.example.securenotes.dto.NoteResource;
import com.example.securenotes.service.NoteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*") // TODO
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/notes")
public class NoteController {
    private final NoteService noteService;

    @PostMapping
    ResponseEntity<Void> createNote(@RequestBody @Valid CreateNoteRequest createNoteRequest) {
        noteService.createNote(createNoteRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{id}")
    ResponseEntity<NoteResource> getNoteById(@PathVariable UUID id) {
        final var note = noteService.getNoteById(id);
        return ResponseEntity.ok(note);
    }

    @GetMapping
    ResponseEntity<List<NoteResource>> getNotes() {
        final var notes = noteService.getAllNotes();
        return ResponseEntity.ok(notes);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteNoteById(@PathVariable UUID id) {
        noteService.deleteNoteById(id);
        return ResponseEntity.noContent().build();
    }
}

package com.example.securenotes.service;

import com.example.securenotes.dto.CreateNoteRequest;
import com.example.securenotes.dto.NoteResource;
import com.example.securenotes.mapper.NoteMapper;
import com.example.securenotes.repository.NoteRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteMapper noteMapper;
    private final NoteRepository noteRepository;

    @Transactional
    public void createNote(CreateNoteRequest createNoteRequest) {
        final var note = noteMapper.mapCreateNoteRequestToNote(createNoteRequest);
        noteRepository.save(note);
    }

    public NoteResource getNoteById(UUID id) {
        final var note = noteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Note with id " + id + " does not exist"));
        return noteMapper.mapNoteToNoteResource(note);
    }

    public List<NoteResource> getAllNotes() {
        final var notes = noteRepository.findAll();
        return notes.stream()
                .map(noteMapper::mapNoteToNoteResource)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteNoteById(UUID id) {
        validateIfNoteExists(id);
        noteRepository.deleteById(id);
    }

    private void validateIfNoteExists(UUID id) {
        if (!noteRepository.existsById(id)) {
            throw new IllegalArgumentException("Note with id " + id + " does not exist");
        }
    }
}

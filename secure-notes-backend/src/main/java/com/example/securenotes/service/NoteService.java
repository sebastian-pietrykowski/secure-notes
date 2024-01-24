package com.example.securenotes.service;

import com.example.securenotes.domain.Note;
import com.example.securenotes.dto.CreateNoteRequest;
import com.example.securenotes.dto.EncryptedNotePassword;
import com.example.securenotes.dto.NoteResource;
import com.example.securenotes.mapper.NoteMapper;
import com.example.securenotes.repository.NoteRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteMapper noteMapper;
    private final NoteRepository noteRepository;
    private final CipherService cipherService;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void createNote(CreateNoteRequest createNoteRequest) {
        final var note = noteMapper.mapCreateNoteRequestToNote(createNoteRequest);
        if (note.getIsEncrypted()) {
            encipherNoteContent(note);
            note.setPassword(passwordEncoder.encode(note.getPassword()));
        }
        noteRepository.save(note);
    }

    public NoteResource getNoteById(UUID id) {
        final var note = noteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Note with id " + id + " does not exist"));
        return noteMapper.mapEncryptedNoteToPartialNoteResource(note);
    }

    public NoteResource getEncryptedNoteById(UUID id, EncryptedNotePassword encryptedNotePassword) {
        final var note = noteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Note with id " + id + " does not exist"));
        if (!passwordEncoder.matches(encryptedNotePassword.password(), note.getPassword()))
            throw new IllegalArgumentException("Invalid password");

        decipherNoteContent(note);
        return noteMapper.mapNoteToNoteResource(note);
    }

    public List<NoteResource> getAllNotes() {
        final var notes = noteRepository.findAll();
        return notes.stream()
                .map(noteMapper::mapEncryptedNoteToPartialNoteResource)
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

    private void decipherNoteContent(Note note) {
        String algorithm = "AES/CBC/PKCS5Padding";
        IvParameterSpec iv = new IvParameterSpec(note.getIv());
        try {
            SecretKey secretKey = cipherService.generateSecretKey(note.getTitle(), note.getTitle());
            note.setContent(cipherService.decode(algorithm, note.getContent(), iv, secretKey));
            note.setIv(iv.getIV());
        } catch (Exception e) {
            throw new IllegalArgumentException("Error in deciphering content");
        }
    }

    private void encipherNoteContent(Note note) {
        String algorithm = "AES/CBC/PKCS5Padding";
        IvParameterSpec iv = cipherService.generateIv();
        try {
            SecretKey secretKey = cipherService.generateSecretKey(note.getTitle(), note.getTitle());
            note.setContent(cipherService.encode(algorithm, note.getContent(), iv, secretKey));
            note.setIv(iv.getIV());
        } catch (Exception e) {
            throw new IllegalArgumentException("Error in enciphering content");
        }
    }
}

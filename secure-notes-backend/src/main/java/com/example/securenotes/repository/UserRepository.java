package com.example.securenotes.repository;

import com.example.securenotes.domain.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<AppUser, UUID> {
    public Optional<AppUser> findByEmail(String email);
}

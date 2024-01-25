package com.example.securenotes.config;

import com.example.securenotes.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CustomAuthProvider extends DaoAuthenticationProvider {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserDetailsService userDetailsService;

    @PostConstruct
    private void init() {
        setUserDetailsService(userDetailsService);
        setPasswordEncoder(passwordEncoder);
    }

    @Override
    protected void additionalAuthenticationChecks(UserDetails userDetails, UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {
        super.additionalAuthenticationChecks(userDetails, authentication);
        final var user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        if (user.getIsAccountLocked()) {
            throw new BadCredentialsException("Account is locked");
        }
    }
}

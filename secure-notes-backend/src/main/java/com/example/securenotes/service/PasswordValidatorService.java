package com.example.securenotes.service;


import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PasswordValidatorService {
    private static final int MINIMUM_PASSWORD_LENGTH = 10;
    private static final double MINIMUM_PASSWORD_SHANNON_ENTROPY = 3.0;

    public void validatePassword(String password) {
        final var shannonEntropy = countShannonEntropy(password);

        if(password.length() < MINIMUM_PASSWORD_LENGTH) {
            throw new IllegalArgumentException("Password is too short");
        }

        if (shannonEntropy < MINIMUM_PASSWORD_SHANNON_ENTROPY) {
            throw new IllegalArgumentException("Password has to low entropy");
        }
    }

    private double countShannonEntropy(String password) {
        final var characterFrequencies = countCharacterFrequencies(password);
        final var passwordLength = password.length();

        double negativeEntropy = 0.0;
        for (final var character : characterFrequencies.keySet()) {
            final var characterFrequency = characterFrequencies.get(character);
            final var characterProbability = (double) characterFrequency / passwordLength;
            negativeEntropy += characterProbability * log2(characterProbability);
        }
        return -negativeEntropy;
    }

    private Map<Character, Integer> countCharacterFrequencies(String password) {
        final var characterFrequencies = new HashMap<Character, Integer>();
        for (final var character : password.toCharArray()) {
            if (characterFrequencies.containsKey(character)) {
                characterFrequencies.put(character, characterFrequencies.get(character) + 1);
            } else {
                characterFrequencies.put(character, 1);
            }
        }

        return characterFrequencies;
    }

    private double log2(double x) {
        return Math.log(x) / Math.log(2);
    }
}

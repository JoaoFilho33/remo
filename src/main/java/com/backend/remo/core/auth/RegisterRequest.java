package com.backend.remo.core.auth;

import com.backend.remo.models.constants.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data @AllArgsConstructor @NoArgsConstructor @Builder
public class RegisterRequest {
    String nome;
    String email;
    String senha;
    Timestamp dataNasc;
    Role role;
}

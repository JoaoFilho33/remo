package com.backend.remo.models.usuario;

import com.backend.remo.models.constants.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;

@Data @AllArgsConstructor
public class RegisterDto {
    String nome;
    String email;
    String senha;
    Timestamp dataNasc;
    Role role;
}

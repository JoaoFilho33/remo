package com.backend.remo.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "senha")
    private String senha;

    @Column(name = "data_nasc")
    private Timestamp dataNasc;

    @Column(name = "biografia")
    private String biografia;

    @Column(name = "foto")
    private String foto;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "usuario")
    private List<Prateleira> prateleiras;
}

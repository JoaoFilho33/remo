package com.backend.remo.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Filme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ano")
    private String ano;

    @Column(name = "tipo")
    private String tipo;

    @Column(name = "sinopse")
    private String sinopse;

    @Column(name = "genero")
    private String genero;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "filme")
    private List<PrateleiraFilme> prateleiraFilmes;
}

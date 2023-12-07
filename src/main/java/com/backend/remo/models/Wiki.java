package com.backend.remo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Wiki {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "conteudo")
    private String conteudo;

    @Column(name = "tema")
    private String tema;

    @Column(name = "titulo")
    private String titulo;

    @ManyToOne
    @JoinColumn(name = "id_participante", nullable = false)
    private Participante participante;

    /*@OneToMany
    @JoinColumn(name = "id_comunidade", nullable = false)
    private Comunidade idComunidade;*/

    @ManyToOne
    @JoinColumn(name = "comunidade_id", nullable = false)
    private Comunidade comunidade;

    @JsonIgnore
    @OneToMany(mappedBy = "wiki")
    private List<Reage> reages;
}

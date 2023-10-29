package com.backend.remo.models;

<<<<<<< HEAD
import com.fasterxml.jackson.annotation.JsonIgnore;
=======
>>>>>>> f394832 (b)
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

<<<<<<< HEAD
//Participante é o relacionamento entre usuário e comunidade
=======
>>>>>>> f394832 (b)
@Entity
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Participante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_saida")
    private Timestamp dataSaida;

    @Column(name = "data_ingresso")
    private Timestamp dataIngresso;

    @ManyToOne
    @JoinColumn(name = "id_user_participa")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_comunidade")
    private Comunidade comunidade;

<<<<<<< HEAD
    @JsonIgnore
=======
>>>>>>> f394832 (b)
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "participante")
    private List<Wiki> wikis;
}

package com.backend.remo.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Segue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "seguidor_id")
    private Usuario seguidor; // Usuário que está seguindo

    @ManyToOne
    @JoinColumn(name = "seguido_id")
    private Usuario seguido; // Usuário que está sendo seguindo

}

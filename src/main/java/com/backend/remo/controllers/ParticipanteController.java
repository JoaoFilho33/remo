package com.backend.remo.controllers;

import com.backend.remo.Services.ParticipanteService;
import com.backend.remo.models.Comunidade;
import com.backend.remo.models.Participante;
import com.backend.remo.models.Usuario;
import jakarta.servlet.http.Part;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/participante")
public class ParticipanteController {
    @Autowired
    private ParticipanteService participanteService;

    @GetMapping
    public ResponseEntity<List<Participante>> getParticipantes() {
        return ResponseEntity.ok((List<Participante>) participanteService.getAllParticipantes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Participante> getParticipanteById(@PathVariable(value = "id") Long id) {
        Participante participante = participanteService.getParticipanteId(id);

        if (participante == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Participante não encontrada!"
            );
        }

        return ResponseEntity.ok().body(participante);
    }

    @PostMapping
    public Participante saveParticipante(@Validated @RequestBody Participante participante) {
        return participanteService.createParticipante(participante);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Participante> putParticipante(@Validated @PathVariable(value = "id") Long id, @RequestBody Participante participante) {
        Participante newParticipante = participanteService.updateParticipante(id, participante);
        if(newParticipante == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Participante não encontrada!"
            );
        }

        return ResponseEntity.ok().body(newParticipante);
    }

    @DeleteMapping("/{id}")
    public Participante deleteParticipante(@PathVariable(value = "id") Long id) {
        Participante byeParticipante = participanteService.removeParticipante(id);
        if(byeParticipante == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Participante não encontrada"
            );
        }

        return byeParticipante;
    }

}

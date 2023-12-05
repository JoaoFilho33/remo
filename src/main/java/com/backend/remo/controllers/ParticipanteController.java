package com.backend.remo.controllers;

import com.backend.remo.Services.ParticipanteService;
import com.backend.remo.models.Participante;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
public class ParticipanteController {
    @Autowired
    private ParticipanteService participanteService;

    @GetMapping("/participante")
    public ResponseEntity<List<Participante>> getParticipantes() {
        return ResponseEntity.ok((List<Participante>) participanteService.getAllParticipantes());
    }

    @GetMapping("/comunidade/{idComunidade}/participante")
    public ResponseEntity<List<Participante>> getParticipantesByComunidade(@PathVariable(value = "idComunidade") Long idComunidade) {
        return ResponseEntity.ok((List<Participante>) participanteService.getAllParticipantesByComunidadeId(idComunidade));
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

    @PostMapping("/participante")
    public Participante saveParticipante(@Validated @RequestBody Participante participante) {
        return participanteService.createParticipante(participante);
    }

    @PutMapping("/participante/{id}")
    public ResponseEntity<Participante> putParticipante(@Validated @PathVariable(value = "id") Long id, @RequestBody Participante participante) {
        Participante newParticipante = participanteService.updateParticipante(id, participante);
        if(newParticipante == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Participante não encontrada!"
            );
        }

        return ResponseEntity.ok().body(newParticipante);
    }

    @DeleteMapping("/participante/{id}")
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

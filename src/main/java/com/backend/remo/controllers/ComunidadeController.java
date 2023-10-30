package com.backend.remo.controllers;

import com.backend.remo.Services.ComunidadeService;
import com.backend.remo.models.Comunidade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/comunidade")
public class ComunidadeController {
    @Autowired
    private ComunidadeService comunidadeService;

    @GetMapping
    public ResponseEntity<List<Comunidade>> getComunidade() {
        return ResponseEntity.ok(comunidadeService.getAllComunidades());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Comunidade> getComunidadeById(@PathVariable(value = "id") Long id) {
        Comunidade comunidade = comunidadeService.getComunidadeById(id);

        if (comunidade == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Comunidade não encontrada!"
            );
        }

        return ResponseEntity.ok().body(comunidade);
    }

    @PostMapping
    public Comunidade saveComunidade(@Validated @RequestBody Comunidade comunidade) {
        return comunidadeService.createComunidade(comunidade);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Comunidade> putComunidade(@Validated @PathVariable(value = "id") Long id, @RequestBody Comunidade comunidade) {
        Comunidade newComunidade = comunidadeService.updateComunidade(id, comunidade);
        if(newComunidade == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Comunidade não encontrada!"
            );
        }

        return ResponseEntity.ok().body(newComunidade);
    }

    @DeleteMapping("/{id}")
    public Comunidade deleteComunidade(@PathVariable(value = "id") Long id) {
        Comunidade byeComunidade = comunidadeService.removeComunidade(id);
        if(byeComunidade == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Comunidade não encontrada"
            );
        }

        return byeComunidade;
    }

}

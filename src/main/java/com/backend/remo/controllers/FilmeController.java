package com.backend.remo.controllers;

import com.backend.remo.Services.FilmeService;
import com.backend.remo.models.Filme;
import com.backend.remo.models.Filme;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/filme")
@CrossOrigin(origins = "http://localhost:5173")

public class    FilmeController {
    @Autowired
    private FilmeService filmeService;

    @GetMapping
    public ResponseEntity<List<Filme>> getFilmes() {
        return ResponseEntity.ok(filmeService.getAllFilmes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Filme> getFilmeById(@PathVariable(value = "id") Long id) {
        Filme filme = filmeService.getFilmeById(id);

        if (filme == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Filme não encontrada!"
            );
        }

        return ResponseEntity.ok().body(filme);
    }

    @PostMapping
    public Filme saveFilme(@Validated @RequestBody Filme filme) {
        return filmeService.createFilme(filme);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Filme> putFilme(@Validated @PathVariable(value = "id") Long id, @RequestBody Filme filme) {
        Filme newFilme = filmeService.updateFilme(id, filme);
        if(newFilme == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Filme não encontradado!"
            );
        }

        return ResponseEntity.ok().body(newFilme);
    }

    @DeleteMapping("/{id}")
    public Filme deleteFilme(@PathVariable(value = "id") Long id) {
        Filme byeFilme = filmeService.deleteFilme(id);
        if(byeFilme == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Filme não encontrada"
            );
        }

        return byeFilme;
    }
}

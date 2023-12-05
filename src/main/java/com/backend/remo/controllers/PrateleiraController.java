package com.backend.remo.controllers;

import com.backend.remo.Services.PrateleiraService;
import com.backend.remo.models.Participante;
import com.backend.remo.models.Prateleira;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // Substitua pelo seu domínio frontend

@RequestMapping("/prateleira")
public class PrateleiraController {
    @Autowired
    private PrateleiraService prateleiraService;

    @GetMapping
    public ResponseEntity<List<Prateleira>> getPrateleira() {
        return ResponseEntity.ok((List<Prateleira>) prateleiraService.getAllPrateleiras());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Prateleira> getPrateleiraById(@PathVariable(value = "id") Long id) {
        Prateleira prateleira = prateleiraService.getPrateleiraId(id);

        if (prateleira == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Participante não encontrada!"
            );
        }

        return ResponseEntity.ok().body(prateleira);
    }

    @PostMapping
    public Prateleira savePrateleira(@Validated @RequestBody Prateleira prateleira) {
        return prateleiraService.createParticipante(prateleira);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Prateleira> putPrateleira(@Validated @PathVariable(value = "id") Long id, @RequestBody Prateleira prateleira) {
        Prateleira newPrateleira = prateleiraService.updatePrateleira(id, prateleira);
        if(newPrateleira == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Prateleira não encontrada!"
            );
        }

        return ResponseEntity.ok().body(newPrateleira);
    }

    @DeleteMapping("/{id}")
    public Prateleira deletePrateleira(@PathVariable(value = "id") Long id) {
        Prateleira byePratileira = prateleiraService.removePrateleira(id);
        if(byePratileira == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Prateleira não encontrada"
            );
        }

        return byePratileira;
    }
}

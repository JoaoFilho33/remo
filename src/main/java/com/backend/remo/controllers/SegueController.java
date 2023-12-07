package com.backend.remo.controllers;


import com.backend.remo.Services.SegueService;
import com.backend.remo.models.Segue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/segue")
@CrossOrigin(origins = "http://localhost:5173")

public class SegueController {
    @Autowired
    private SegueService segueService;

    @GetMapping
    public ResponseEntity<List<Segue>> getSegues() {
        return ResponseEntity.ok((List<Segue>) segueService.getAllSegues());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Segue> getSegueById(@PathVariable(value = "id") Long id) {
        Segue segue = segueService.getSegueById(id);

        if (segue == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "segue não encontrada!"
            );
        }

        return ResponseEntity.ok().body(segue);
    }

    @PostMapping
    public Segue saveSegue(@Validated @RequestBody Segue reage
    ) {
        return segueService.createSegue(reage);
    }
}

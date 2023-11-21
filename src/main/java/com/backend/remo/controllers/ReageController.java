package com.backend.remo.controllers;


import com.backend.remo.Services.ReageService;
import com.backend.remo.models.Reage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wiki/reage")
public class ReageController {
    @Autowired
    private ReageService reageService;

    @GetMapping
    public ResponseEntity<List<Reage>> getReages() {
        return ResponseEntity.ok((List<Reage>) reageService.getAllReage());
    }

    @PostMapping
    public Reage saveReage(@Validated @RequestBody Reage reage
    ) {
        return reageService.createReage(reage);
    }
}

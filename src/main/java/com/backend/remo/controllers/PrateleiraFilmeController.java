package com.backend.remo.controllers;


import com.backend.remo.Services.PrateleiraFilmeService;
import com.backend.remo.Services.PrateleiraService;
import com.backend.remo.models.Filme;
import com.backend.remo.models.PrateleiraFilme;
import com.backend.remo.repositories.PrateleiraFilmeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/prateleiraFilme")
public class PrateleiraFilmeController  {
    @Autowired
    private PrateleiraFilmeService prateleiraFilmeService;

    @GetMapping
    public ResponseEntity<List<PrateleiraFilme>> getPrateleiraFilme() { return ResponseEntity.ok(prateleiraFilmeService.getAllPrateleiraFilmes()); }

    @PostMapping
    public PrateleiraFilme savePrateleiraFilme(@Validated @RequestBody PrateleiraFilme prateleiraFilme){
        return prateleiraFilmeService.createPrateleiraFilme(prateleiraFilme);
    }
}

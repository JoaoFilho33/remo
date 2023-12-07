package com.backend.remo.controllers;


import com.backend.remo.Services.WikiService;
import com.backend.remo.models.Wiki;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")  //aqui eu add a origem do meu front
@RestController
@RequestMapping("/wiki")
public class WikiController {
    @Autowired
    private WikiService wikiService;

    @GetMapping
    public ResponseEntity<List<Wiki>> getWikis(){
        return ResponseEntity.ok(wikiService.getAllWikis());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Wiki> getWikiById(@PathVariable Long id) {
        Wiki wiki = wikiService.getWikiById(id);
        if (wiki != null) {
            return ResponseEntity.ok(wiki);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/participante/{idParticipante}")
    public ResponseEntity<List<Wiki>> getWikisByParticipant(@PathVariable Long idParticipante) {
        List<Wiki> wikis = wikiService.getWikisByParticipant(idParticipante);
        return ResponseEntity.ok(wikis);
    }

    @GetMapping("/comunidade/{idComunidade}")
    public ResponseEntity<List<Wiki>> getWikisByComunidade(@PathVariable Long idComunidade) {
        List<Wiki> wikis = wikiService.getAllWikisByComunidade(idComunidade);
        return ResponseEntity.ok(wikis);
    }

//    @PostMapping
//    public Wiki postWiki(@Validated @RequestBody Wiki wiki){
//        return wikiService.createWiki(wiki);
//    }

    @PostMapping("/comunidade/wiki")
    public Wiki postComunidadeWiki(@Validated @RequestBody Wiki wiki) {
        return wikiService.createWiki(wiki);
    }

}

package com.backend.remo.controllers;


import com.backend.remo.Services.WikiService;
import com.backend.remo.models.Usuario;
import com.backend.remo.models.Wiki;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class WikiController {
    @Autowired
    private WikiService wikiService;

    @GetMapping("/wiki")
    public ResponseEntity<List<Wiki>> getWikis(){
        return ResponseEntity.ok((List<Wiki>) wikiService.getAllWikis());
    }

    @GetMapping("/usuario/{id}/wiki")
    public ResponseEntity<List<Wiki>> getWikisByUser(@PathVariable("id") Long id){
        return ResponseEntity.ok((List<Wiki>) wikiService.getAllWikisByUsuario(id));
    }
    @GetMapping("/comunidade/{idComunidade}/wiki")
    public ResponseEntity<List<Wiki>> getWikisByComunidade(@PathVariable("idComunidade") Long idComunidade){
        return ResponseEntity.ok((List<Wiki>) wikiService.getAllWikisByComunidade(idComunidade));
    }

    @GetMapping("/comunidade/{idComunidade}/participante/{idParticipante}/wiki")
    public ResponseEntity<List<Wiki>> getWikisOfParticipanteByComunidade(@PathVariable("idComunidade") Long idComunidade, @PathVariable("idParticipante") Long idParticipante){
        return ResponseEntity.ok((List<Wiki>) wikiService.getWikisOfParticipanteByComunidade(idComunidade, idParticipante));
    }

    @PostMapping("/comunidade/wiki")
    public Wiki postWiki( @Validated @RequestBody Wiki wiki) {
        return wikiService.createWiki(wiki);
    }

}

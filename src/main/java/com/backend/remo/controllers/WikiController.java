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
@RequestMapping("/wiki")
public class WikiController {
    @Autowired
    private WikiService wikiService;

    @GetMapping
    public ResponseEntity<List<Wiki>> getWikis(){
        return ResponseEntity.ok((List<Wiki>) wikiService.getAllWikis());
    }

    @PostMapping
    public Wiki postWiki(@Validated @RequestBody Wiki wiki){
        return wikiService.createWiki(wiki  );
    }

}

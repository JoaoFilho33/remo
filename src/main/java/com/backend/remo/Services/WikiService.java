package com.backend.remo.Services;


import com.backend.remo.models.Wiki;
import com.backend.remo.repositories.WikiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WikiService {
    @Autowired
    private WikiRepository wikiRepository;

    public List<Wiki> getAllWikis() {
        return wikiRepository.findAll();
    }

    public List<Wiki> getAllWikisByComunidade(Long idComunidade) {
        return wikiRepository.getAllWikisByComunidade(idComunidade);
    }

    public List<Wiki> getWikisOfParticipanteByComunidade(Long idComunidade, Long idParticipante) {
        return wikiRepository.getWikisOfParticipanteByComunidade(idComunidade, idParticipante);
    }

    public List<Wiki> getAllWikisByUsuario(Long idUsuario) {
        return wikiRepository.getAllWikisByUsuario(idUsuario);
    }




    public Wiki createWiki(Wiki wiki) {
        return wikiRepository.save(wiki);
    }

}

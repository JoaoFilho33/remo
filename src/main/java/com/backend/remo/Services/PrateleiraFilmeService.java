package com.backend.remo.Services;

import com.backend.remo.models.PrateleiraFilme;
import com.backend.remo.repositories.PrateleiraFilmeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrateleiraFilmeService {
    @Autowired
    private PrateleiraFilmeRepository prateleiraFilmeRepository;

    public List<PrateleiraFilme> getAllPrateleiraFilmes() {
        return prateleiraFilmeRepository.findAll();
    }

    public PrateleiraFilme getPrateleiraFilmeById(Long id) {
        return prateleiraFilmeRepository.findById(id).orElse(null);
    }


    public PrateleiraFilme createPrateleiraFilme(PrateleiraFilme prateleiraFilme) {
        return prateleiraFilmeRepository.save(prateleiraFilme);
    }

    public PrateleiraFilme updatePrateleiraFilme(Long id, PrateleiraFilme prateleiraFilme) {
        if(!prateleiraFilmeRepository.existsById(id)) {
            return null;
        }

        prateleiraFilme.setId(id);
        return prateleiraFilmeRepository.save(prateleiraFilme);
    }

    public PrateleiraFilme removePrateleiraFilme(Long id) {
        Optional<PrateleiraFilme> prateleiraFilmeOptional = prateleiraFilmeRepository.findById(id);

        if (!prateleiraFilmeOptional.isPresent()) {
            return null;
        }

        PrateleiraFilme prateleiraFilme = prateleiraFilmeOptional.get();
        prateleiraFilmeRepository.delete(prateleiraFilme);
        return prateleiraFilme;
    }


}
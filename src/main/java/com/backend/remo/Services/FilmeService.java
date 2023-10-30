package com.backend.remo.Services;

import com.backend.remo.models.Comunidade;
import com.backend.remo.models.Filme;
import com.backend.remo.repositories.FilmeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FilmeService {

    @Autowired
    private FilmeRepository filmeRepository;

    public List<Filme> getAllFilmes() {
        return filmeRepository.findAll();
    }

    public Filme getFilmeById(Long id) {
        return filmeRepository.findById(id).orElse(null);
    }

    public Filme createFilme(Filme filme) {
        return filmeRepository.save(filme);
    }

    public Filme updateFilme(Long id, Filme filme) {
        if (!filmeRepository.existsById(id)) {
            return null;
        }

        filme.setId(id);
        return filmeRepository.save(filme);
    }

    public Filme deleteFilme(Long id) {

        Optional<Filme> filmeOptional = filmeRepository.findById(id);

        if (!filmeOptional.isPresent()) {
            return null;
        }

        Filme filme = filmeOptional.get();
        filmeRepository.delete(filme);
        return filme;
    }

}

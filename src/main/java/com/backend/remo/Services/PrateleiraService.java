package com.backend.remo.Services;

import com.backend.remo.models.Prateleira;
import com.backend.remo.repositories.PrateleiraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PrateleiraService {
    @Autowired
    private PrateleiraRepository prateleiraRepository;

    public Object getAllPrateleiras() {
        return prateleiraRepository.findAll();
    }

    public Prateleira getPrateleiraId(Long id) {
        return prateleiraRepository.findById(id).orElse(null);
    }

    public Prateleira createParticipante(Prateleira prateleira) {
        return prateleiraRepository.save(prateleira);
    }


    public Prateleira updatePrateleira(Long id, Prateleira prateleira) {
        if(!prateleiraRepository.existsById(id)) {
            return null;
        }

        prateleira.setId(id);
        return prateleiraRepository.save(prateleira);
    }

    public Prateleira removePrateleira(Long id) {
        Optional<Prateleira> prateleiraOptional = prateleiraRepository.findById(id);

        if (!prateleiraOptional.isPresent()) {
            return null;
        }

        Prateleira prateleira = prateleiraOptional.get();
        prateleiraRepository.delete(prateleira);
        return prateleira;
    }
}

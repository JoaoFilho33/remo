package com.backend.remo.Services;


import com.backend.remo.repositories.ReageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.backend.remo.models.*;


import java.util.List;
import java.util.Optional;

@Service
public class ReageService {
    @Autowired
    private ReageRepository reageRepository;

    public List<Reage> getAllReage() {
        return reageRepository.findAll();
    }

    public Reage getReageId(Long id) {
        return reageRepository.findById(id).orElse(null);
    }

    public Reage createReage(Reage reage) {
        return reageRepository.save(reage);
    }

    public Reage updateReage(Long id, Reage reage) {
        if(!reageRepository.existsById(id)) {
            return null;
        }

        reage.setId(id);
        return reageRepository.save(reage);
    }

    public Reage removeReage(Long id) {
        Optional<Reage> reageOptional = reageRepository.findById(id);

        if (!reageOptional.isPresent()) {
            return null;
        }

        Reage reage = reageOptional.get();
        reageRepository.delete(reage);
        return reage;
    }
}

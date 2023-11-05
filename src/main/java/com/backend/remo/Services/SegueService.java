package com.backend.remo.Services;

import com.backend.remo.models.Segue;
import com.backend.remo.repositories.SegueRepository;
import com.backend.remo.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SegueService {

    @Autowired
    private SegueRepository segueRepository;

    public List<Segue> getAllSegues() {
        return segueRepository.findAll();
    }

    public Segue getSegueById(Long id) {
        return segueRepository.findById(id).orElse(null);
    }


    public Segue createSegue(Segue segue) {
        return segueRepository.save(segue);
    }

    public Segue updateSegue(Long id, Segue segue) {
        if(!segueRepository.existsById(id)) {
            return null;
        }

        segue.setId(id);
        return segueRepository.save(segue);
    }


    public Segue removeSegue(Long id) {
        Optional<Segue> segueOptional = segueRepository.findById(id);

        if (!segueOptional.isPresent()) {
            return null;
        }

        Segue segue = segueOptional.get();
        segueRepository.delete(segue);
        return segue;
    }
}

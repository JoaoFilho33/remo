package com.backend.remo.Services;

import com.backend.remo.models.Participante;
import com.backend.remo.models.Usuario;
import com.backend.remo.repositories.ParticipanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ParticipanteService {
    @Autowired
    private ParticipanteRepository participanteRepository;

    public List<Participante> getAllParticipantes() {
        return participanteRepository.findAll();
    }

    public Participante getParticipanteId(Long id) {
        return participanteRepository.findById(id).orElse(null);
    }

    public List<Participante> getAllParticipantesByComunidadeId(Long id) {
        return participanteRepository.getAllParticipanteByComunidadeId(id);
    }
    public Participante createParticipante(Participante participante) {
        return participanteRepository.save(participante);
    }

    public Participante updateParticipante(Long id, Participante participante) {
        if(!participanteRepository.existsById(id)) {
            return null;
        }

        participante.setId(id);
        return participanteRepository.save(participante);
    }

    public Participante removeParticipante(Long id) {
        Optional<Participante> participanteOptional = participanteRepository.findById(id);

        if (!participanteOptional.isPresent()) {
            return null;
        }

        Participante participante = participanteOptional.get();
        participanteRepository.delete(participante);
        return participante;
    }
}

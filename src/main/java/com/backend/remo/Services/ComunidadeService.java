package com.backend.remo.Services;

import com.backend.remo.models.Comunidade;
import com.backend.remo.models.Participante;
import com.backend.remo.models.Usuario;
import com.backend.remo.repositories.ComunidadeRepository;
import com.backend.remo.repositories.ParticipanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComunidadeService {
    @Autowired
    private ComunidadeRepository comunidadeRepository;
    @Autowired
    private ParticipanteService participanteService;

    public List<Comunidade> getAllComunidades() {
        return comunidadeRepository.findAll();
    }

    public Comunidade getComunidadeById(Long id) {
        return comunidadeRepository.findById(id).orElse(null);
    }


    public Comunidade createComunidade(Comunidade comunidade) {
        comunidadeRepository.save(comunidade);
        Usuario usuarioCriador = comunidade.getUsuario();
        Participante participanteCriador = Participante.builder()
                .comunidade(comunidade)
                .dataIngresso(comunidade.getDataCriacao())
                .usuario(usuarioCriador)
                .build();
        participanteService.createParticipante(participanteCriador);
        return comunidade;
    }

    public Comunidade updateComunidade(Long id, Comunidade comunidade) {
        if(!comunidadeRepository.existsById(id)) {
            return null;
        }

        comunidade.setId(id);
        return comunidadeRepository.save(comunidade);
    }

    public Comunidade removeComunidade(Long id) {
        Optional<Comunidade> comunidadeOptional = comunidadeRepository.findById(id);

        if (!comunidadeOptional.isPresent()) {
            return null;
        }

        Comunidade comunidade = comunidadeOptional.get();
        comunidadeRepository.delete(comunidade);
        return comunidade;
    }
}

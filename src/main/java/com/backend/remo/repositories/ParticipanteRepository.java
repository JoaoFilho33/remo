package com.backend.remo.repositories;

import com.backend.remo.models.Participante;
import jakarta.servlet.http.Part;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParticipanteRepository extends JpaRepository<Participante, Long> {

    @Query(value = "select p.* from participante p\n" +
            "inner join comunidade c \n" +
            "on p.id_comunidade = c.id \n" +
            "where c.id = :id", nativeQuery = true)
    public List<Participante> getAllParticipanteByComunidadeId(@Param("id") Long id);
}

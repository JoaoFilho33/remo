package com.backend.remo.repositories;

import com.backend.remo.models.Wiki;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WikiRepository extends JpaRepository<Wiki, Long> {

    @Query(value = "select w.* from wiki w \n" +
            "inner join participante p \n" +
            "on w.id_participante = p.id\n" +
            "inner join comunidade c \n" +
            "on p.id_comunidade = c.id \n" +
            "where c.id = :id", nativeQuery = true)
    public List<Wiki> getAllWikisByComunidade(@Param("id") Long id);

    @Query(value = "select w.* from wiki w \n" +
            "inner join participante p \n" +
            "on w.id_participante = p.id\n" +
            "inner join comunidade c \n" +
            "on p.id_comunidade = c.id \n" +
            "where c.id = :cid and p.id = :pid", nativeQuery = true)
    public List<Wiki> getWikisOfParticipanteByComunidade(@Param("cid") Long cid,
                                                         @Param("pid") Long pid);

    @Query(value = "select w.* from wiki w \n" +
            "inner join participante p \n" +
            "on w.id_participante  = p.id \n" +
            "inner join usuario u \n" +
            "on p.id_user_participa = u.id \n" +
            "where u.id = :id", nativeQuery = true)
    public List<Wiki> getAllWikisByUsuario(@Param("id") Long id);


}
package com.backend.remo.repositories;

import com.backend.remo.models.Comunidade;
import jdk.jfr.Enabled;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

//@EnableJpaRepositories

@Repository
public interface ComunidadeRepository extends JpaRepository<Comunidade, Long> {

}

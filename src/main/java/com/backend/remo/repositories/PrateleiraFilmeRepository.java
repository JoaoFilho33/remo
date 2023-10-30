package com.backend.remo.repositories;

import com.backend.remo.models.PrateleiraFilme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrateleiraFilmeRepository extends JpaRepository<PrateleiraFilme, Long> {
}

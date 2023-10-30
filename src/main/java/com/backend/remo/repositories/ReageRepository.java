package com.backend.remo.repositories;

import com.backend.remo.models.Reage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReageRepository extends JpaRepository<Reage, Long> {
}

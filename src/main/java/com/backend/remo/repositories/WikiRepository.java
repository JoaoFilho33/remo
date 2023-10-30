package com.backend.remo.repositories;

import com.backend.remo.models.Wiki;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WikiRepository extends JpaRepository<Wiki, Long> {
}

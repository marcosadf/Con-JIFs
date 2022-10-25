package com.conjifs.domain.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.conjifs.domain.model.Manager;

@Repository
public interface ManagerRepository extends JpaRepository<Manager, Long>{
	Optional<Manager> findByLogin(String login);
}

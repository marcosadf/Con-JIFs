package com.conjifs.domain.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.conjifs.domain.model.Bracket;
import com.conjifs.domain.model.Compete;
import com.conjifs.domain.model.Team;

@Repository
public interface CompeteRepository extends JpaRepository<Compete, Long>{
	Set<Compete> findByTeam(Team team);
	Set<Compete> findByBracket(Bracket bracket);
}

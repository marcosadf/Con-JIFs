package com.conjifs.domain.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.conjifs.domain.model.Bracket;
import com.conjifs.domain.model.Match;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long>{
	Set<Match> findByBracket(Bracket bracket);
}

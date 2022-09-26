package com.conjifis.domain.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.conjifis.domain.model.Bracket;
import com.conjifis.domain.model.Match;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long>{
	Set<Match> findByBracket(Bracket bracket);
}

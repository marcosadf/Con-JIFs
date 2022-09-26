package com.conjifis.domain.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.conjifis.domain.model.Dispute;
import com.conjifis.domain.model.Match;
import com.conjifis.domain.model.Team;

@Repository
public interface DisputeRepository extends JpaRepository<Dispute, Long>{
	Set<Dispute> findByTeam(Team team);
	Set<Dispute> findByMatch(Match match);
}

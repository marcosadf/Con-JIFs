package com.conjifis.domain.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.conjifis.domain.model.Modality;
import com.conjifis.domain.model.Team;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long>{
	Set<Team> findByCampusContains(String campus);
	Set<Team> findByModalityContains(Modality modality);
	Set<Team> findByNameContains(String name);
}

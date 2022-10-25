package com.conjifs.domain.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.conjifs.domain.model.Modality;
import com.conjifs.domain.model.Team;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long>{
	Set<Team> findByCampusContains(String campus);
	Set<Team> findByModality(Modality modality);
	Set<Team> findByNameContains(String name);
}

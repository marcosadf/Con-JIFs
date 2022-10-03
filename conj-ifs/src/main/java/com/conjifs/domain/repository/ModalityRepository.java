package com.conjifs.domain.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.conjifs.domain.model.Championship;
import com.conjifs.domain.model.Modality;
import com.conjifs.domain.model.TypeCompetition;

@Repository
public interface ModalityRepository extends JpaRepository<Modality, Long>{
	Set<Modality> findByChampionship(Championship championship);
	Set<Modality> findByNameContains(String name);
	Set<Modality> findByTypeCompetition(TypeCompetition typeCompetition);
}

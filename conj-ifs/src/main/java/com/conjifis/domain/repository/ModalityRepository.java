package com.conjifis.domain.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.conjifis.domain.model.Championship;
import com.conjifis.domain.model.Modality;
import com.conjifis.domain.model.TypeCompetition;

@Repository
public interface ModalityRepository extends JpaRepository<Modality, Long>{
	Set<Modality> findByChampionship(Championship championship);
	Set<Modality> findByNameContains(String name);
	Set<Modality> findByTypeCompetition(TypeCompetition typeCompetition);
}

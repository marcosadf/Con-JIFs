package com.conjifis.domain.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.conjifis.domain.model.Modality;
import com.conjifis.domain.model.Stage;

@Repository
public interface StageRepository extends JpaRepository<Stage, Long>{
	Set<Stage> findByModality(Modality modality);
}

package com.conjifs.domain.repository;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.conjifs.domain.model.Modality;
import com.conjifs.domain.model.Stage;

@Repository
public interface StageRepository extends JpaRepository<Stage, Long>{
	Set<Stage> findByModality(Modality modality);
	Optional<Stage> findByParentStage(Stage parentStage);
}

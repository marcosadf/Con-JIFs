package com.conjifs.domain.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.conjifs.domain.model.Bracket;
import com.conjifs.domain.model.Stage;

@Repository
public interface BracketRepository extends JpaRepository<Bracket, Long>{
	Set<Bracket> findByParentBracket(Bracket parentBracket);
	Set<Bracket> findByStage(Stage stage);
}

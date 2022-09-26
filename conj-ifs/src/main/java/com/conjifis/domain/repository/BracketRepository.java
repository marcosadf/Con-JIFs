package com.conjifis.domain.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.conjifis.domain.model.Bracket;

@Repository
public interface BracketRepository extends JpaRepository<Bracket, Long>{
	Set<Bracket> findByParentBracket(Bracket parentBracket);
}

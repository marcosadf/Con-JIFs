package com.conjifis.domain.repository;

import java.util.Date;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.conjifis.domain.model.Championship;

@Repository
public interface ChampionshipRepository extends JpaRepository<Championship, Long>{
	Set<Championship> findByName(String name);
	Set<Championship> findByNameContains(String name);
	Set<Championship> findByDate(Date date);
}
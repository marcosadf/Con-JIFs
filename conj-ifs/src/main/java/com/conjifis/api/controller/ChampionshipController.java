package com.conjifis.api.controller;

import java.util.List;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.conjifis.domain.model.Championship;
import com.conjifis.domain.repository.ChampionshipRepository;
import com.conjifis.domain.service.ChampionshipCatalogService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/championships")
public class ChampionshipController {
	private ChampionshipRepository championshipRepository;
	private ChampionshipCatalogService championshipCatalogService;
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Championship add(@Valid @RequestBody Championship championship) {
		return championshipCatalogService.save(championship);
	}
	
	@PutMapping("/{championshipId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public ResponseEntity<Championship> edit(@PathVariable Long championshipId, @RequestBody Championship championship) {	
		if(!championshipRepository.existsById(championshipId)) {
			return ResponseEntity.notFound().build();
		}
		
		championship.setId(championshipId);
		championship = championshipCatalogService.save(championship);
		
		return ResponseEntity.ok(championship);
	}	
	
	@GetMapping
	public List<Championship> listAll(){
		return championshipRepository.findAll();
	}
	
	@GetMapping("/name")
	public Set<Championship> searchName(@RequestBody Championship championship){
		return championshipRepository.findByNameContains(championship.getName());
	}
	
	@GetMapping("/{championshipId}")
	public ResponseEntity<Championship> search(@PathVariable Long championshipId){
		return championshipRepository.findById(championshipId)
				.map(championship ->	ResponseEntity.ok(championship))
				.orElse(ResponseEntity.notFound().build());
		
	}
}

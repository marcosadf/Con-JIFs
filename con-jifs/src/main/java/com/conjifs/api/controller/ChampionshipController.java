package com.conjifs.api.controller;

import java.util.Set;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.conjifs.domain.model.Championship;
import com.conjifs.domain.service.ChampionshipCatalogService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/championships")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ChampionshipController {
	private ChampionshipCatalogService championshipCatalogService;
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Championship add(@Valid @RequestBody Championship championship) {
		return championshipCatalogService.save(championship);
	}
	
	@PutMapping("/{championshipId}")
	public Championship edit(@PathVariable Long championshipId, @Valid @RequestBody Championship championship) {
		return championshipCatalogService.edit(championshipId, championship);
	}	
	
	@GetMapping
	public Set<Championship> listAll(){
		return championshipCatalogService.listAll();
	}
	
	@CrossOrigin(origins = "http://localhost:8080")
	@PostMapping("/name")
	public Set<Championship> searchName(@RequestBody Championship championship){
		return championshipCatalogService.searchName(championship);
	}
	
	@GetMapping("/{championshipId}")
	public Championship search(@PathVariable Long championshipId){
		return championshipCatalogService.search(championshipId);
	}
	
	@DeleteMapping("/{championshipId}")
	public Championship delete(@PathVariable Long championshipId){
		return championshipCatalogService.delete(championshipId);
	}
}

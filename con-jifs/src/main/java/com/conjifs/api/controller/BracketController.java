package com.conjifs.api.controller;

import java.util.List;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.conjifs.domain.model.Bracket;
import com.conjifs.domain.service.BracketCatalogService;
import com.conjifs.domain.service.BracketRulesService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/brackets")
public class BracketController {
	private BracketCatalogService bracketCatalogService;
	private BracketRulesService bracketRulesService ;
	
	@PostMapping("/championship/{championshipId}/modality/{modalityId}")
	public List<List<Bracket>> create(@PathVariable Long championshipId, @PathVariable Long modalityId) {
		return bracketRulesService.createBrackets(championshipId, modalityId);
	}
	
	@PutMapping("/{bracketId}")
	public Bracket edit(@PathVariable Long bracketId, @Valid @RequestBody Bracket bracket) {
		return bracketCatalogService.edit(bracketId, bracket);
	}

	@GetMapping("/championship/{championshipId}/modality/{modalityId}/stage/{stageId}")
	public Set<Bracket> listAll(@PathVariable Long championshipId, @PathVariable Long modalityId, @PathVariable Long stageId) {
		return bracketCatalogService.listAll(championshipId, modalityId, stageId);
	}
	
	@GetMapping("/championship/{championshipId}/modality/{modalityId}/group")
	public Set<Bracket> listGroupAll(@PathVariable Long championshipId, @PathVariable Long modalityId) {
		return bracketCatalogService.listGroupAll(championshipId, modalityId);
	}

	@GetMapping("/championship/{championshipId}/modality/{modalityId}/stage/{stageId}/name")
	public Bracket searchNameBracket(@PathVariable Long championshipId, @PathVariable Long modalityId, @PathVariable Long stageId, @RequestBody Bracket bracket) {
		return bracketCatalogService.searchName(championshipId, modalityId, stageId, bracket);
	}

	@GetMapping("/championship/{championshipId}/modality/{modalityId}/stage/{stageId}/{bracketId}")
	public Bracket search(@PathVariable Long championshipId, @PathVariable Long modalityId, @PathVariable Long stageId, @PathVariable Long bracketId) {
		return bracketCatalogService.search(championshipId, modalityId, stageId, bracketId);
	}

	@DeleteMapping("/championship/{championshipId}/modality/{modalityId}/stage/{stageId}/{bracketId}")
	public Bracket clear(@PathVariable Long championshipId, @PathVariable Long modalityId,  @PathVariable Long stageId,@PathVariable Long bracketId) {
		return bracketRulesService.clear(championshipId, modalityId, stageId, bracketId);
	}
	@DeleteMapping("/championship/{championshipId}/modality/{modalityId}/stage/{stageId}")
	public Set<Bracket> clearAll(@PathVariable Long championshipId, @PathVariable Long modalityId,  @PathVariable Long stageId) {
		return bracketRulesService.clearAll(championshipId, modalityId, stageId);
	}
}
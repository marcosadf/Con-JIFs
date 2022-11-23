package com.conjifs.api.controller;

import java.util.Set;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.conjifs.domain.model.Compete;
import com.conjifs.domain.model.Stage;
import com.conjifs.domain.service.CompeteCatalogService;
import com.conjifs.domain.service.CompeteRulesService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/competes")
public class CompeteController {
	private CompeteCatalogService competeCatalogService;
	private CompeteRulesService competeRulesService;
	
	@PostMapping("/championship/{championshipId}/modality/{modalityId}")
	public Stage createCompetes(@PathVariable Long championshipId, @PathVariable Long modalityId) {
		return competeRulesService.createCompetes(championshipId, modalityId);
	}
	
	@PutMapping("/{competeId}")
	public Compete edit(@PathVariable Long competeId, @Valid @RequestBody Compete compete) {
		return competeCatalogService.edit(competeId, compete);
	}

	@GetMapping("/championship/{championshipId}/modality/{modalityId}/stage/{stageId}/bracket/{bracketId}")
	public Set<Compete> listAllBracket(@PathVariable Long championshipId, @PathVariable Long modalityId, @PathVariable Long stageId, @PathVariable Long bracketId) {
		return competeCatalogService.listAllBracket(championshipId, modalityId, stageId, bracketId);
	}

	@GetMapping("/championship/{championshipId}/modality/{modalityId}/stage/{stageId}/team/{teamId}")
	public Compete searchTeamStage(@PathVariable Long championshipId, @PathVariable Long modalityId, @PathVariable Long stageId, @PathVariable Long teamId) {
		return competeCatalogService.searchTeamStage(championshipId, modalityId, stageId, teamId);
	}
}

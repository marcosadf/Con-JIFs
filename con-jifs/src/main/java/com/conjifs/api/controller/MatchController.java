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

import com.conjifs.domain.model.Match;
import com.conjifs.domain.model.Modality;
import com.conjifs.domain.service.MatchCatalogService;
import com.conjifs.domain.service.MatchRulesService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/matchs")
public class MatchController {
	private MatchCatalogService matchCatalogService;
	private MatchRulesService matchRulesService;
	
	@PostMapping("/championship/{championshipId}/modality/{modalityId}")
	public Modality createMatchs(@PathVariable Long championshipId, @PathVariable Long modalityId) {
		return matchRulesService.createMatchs(championshipId, modalityId);
	}
	
	@PutMapping("/{matchId}")
	public Match edit(@PathVariable Long matchId, @Valid @RequestBody Match match) {
		return matchCatalogService.edit(matchId, match);
	}

	@GetMapping("/championship/{championshipId}/modality/{modalityId}/stage/{stageId}/bracket/{bracketId}")
	public Set<Match> listAllBracket(@PathVariable Long championshipId, @PathVariable Long modalityId, @PathVariable Long stageId, @PathVariable Long bracketId) {
		return matchCatalogService.listAllBracket(championshipId, modalityId, stageId, bracketId);
	}

	@GetMapping("/championship/{championshipId}/modality/{modalityId}/stage/{stageId}/bracket/{bracketId}/{matchId}")
	public Match searchForBracket(@PathVariable Long championshipId, @PathVariable Long modalityId, Long stageId, @PathVariable Long bracketId, @PathVariable Long matchId) {
		return matchCatalogService.searchForBracket(championshipId, modalityId, stageId, bracketId, matchId);
	}

	@GetMapping("/championship/{championshipId}/modality/{modalityId}/team/{teamId}/{matchId}")
	public Match search(@PathVariable Long championshipId, @PathVariable Long modalityId, @PathVariable Long teamId, @PathVariable Long matchId) {
		return matchCatalogService.searchForTeam(championshipId, modalityId, teamId, matchId);
	}
}
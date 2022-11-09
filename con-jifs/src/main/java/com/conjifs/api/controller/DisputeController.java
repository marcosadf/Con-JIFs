package com.conjifs.api.controller;

import java.util.Set;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.conjifs.domain.model.Dispute;
import com.conjifs.domain.model.Match;
import com.conjifs.domain.service.DisputeCatalogService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/disputes")
public class DisputeController {
	private DisputeCatalogService disputeCatalogService;
	
	@PutMapping("/{disputeId}")
	public Dispute edit(@PathVariable Long disputeId, @Valid @RequestBody Dispute dispute) {
		return disputeCatalogService.edit(disputeId, dispute);
	}

	@GetMapping("/championship/{championshipId}/modality/{modalityId}/stage/{stageId}/bracket/{bracketId}")
	public Set<Dispute> listAllMatch(@PathVariable Long championshipId, @PathVariable Long modalityId, @PathVariable Long stageId, @PathVariable Long bracketId, @PathVariable Long matchId) {
		return disputeCatalogService.listAllMatch(championshipId, modalityId, stageId, bracketId, matchId);
	}

	@GetMapping("/championship/{championshipId}/modality/{modalityId}/stage/{stageId}/bracket/{bracketId}/{disputeId}")
	public Set<Dispute> searchTeamBracket(@PathVariable Long championshipId, @PathVariable Long modalityId, @PathVariable Long stageId, @PathVariable Long bracketId, @PathVariable Long teamId) {
		return disputeCatalogService.searchTeamBracket(championshipId, modalityId, stageId, bracketId, teamId);
	}

	@GetMapping("/championship/{championshipId}/modality/{modalityId}/team/{teamId}/{disputeId}")
	public Match search(@PathVariable Long championshipId, @PathVariable Long modalityId, @PathVariable Long stageId, @PathVariable Long bracketId, @PathVariable Long matchId) {
		return disputeCatalogService.clear(championshipId, modalityId, stageId, bracketId, matchId);
	}
}
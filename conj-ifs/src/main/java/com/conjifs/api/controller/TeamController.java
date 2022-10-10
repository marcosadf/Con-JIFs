package com.conjifs.api.controller;

import java.util.Set;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.conjifs.domain.model.Team;
import com.conjifs.domain.service.TeamCatalogService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/teams")
public class TeamController {
	private TeamCatalogService teamCatalogService;
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Team save(@Valid @RequestBody Team team) {
		return teamCatalogService.save(team);
	}

	@PutMapping("/{teamId}")
	public Team edit(@PathVariable Long teamId, @Valid @RequestBody Team team) {
		return teamCatalogService.edit(teamId, team);
	}

	@GetMapping("/championship/{championshipId}/modality/{modalityId}")
	public Set<Team> listAll(@PathVariable Long championshipId, @PathVariable Long modalityId) {
		return teamCatalogService.listAll(championshipId, modalityId);
	}

	@GetMapping("/championship/{championshipId}/modality/{modalityId}/name")
	public Set<Team> searchName(@PathVariable Long championshipId, @PathVariable Long modalityId, @RequestBody Team team) {
		return teamCatalogService.searchName(championshipId, modalityId, team);
	}

	@GetMapping("/championship/{championshipId}/modality/{modalityId}/{teamId}")
	public Team search(@PathVariable Long championshipId, @PathVariable Long modalityId, @PathVariable Long teamId) {
		return teamCatalogService.search(championshipId, modalityId, teamId);
	}

	@DeleteMapping("/championship/{championshipId}/modality/{modalityId}/{teamId}")
	public Team delete(@PathVariable Long championshipId, @PathVariable Long modalityId, @PathVariable Long teamId) {
		return teamCatalogService.delete(championshipId, modalityId, teamId);
	}
}

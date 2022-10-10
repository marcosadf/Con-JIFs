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

import com.conjifs.domain.model.Stage;
import com.conjifs.domain.service.StageCatalogService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/stages")
public class StageController {
	private StageCatalogService stageCatalogService;
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Stage save(@Valid @RequestBody Stage stage) {
		return stageCatalogService.save(stage);
	}

	@PutMapping("/{stageId}")
	public Stage edit(@PathVariable Long stageId, @Valid @RequestBody Stage stage) {
		return stageCatalogService.edit(stageId, stage);
	}

	@GetMapping("/championship/{championshipId}/modality/{modalityId}")
	public Set<Stage> listAll(@PathVariable Long championshipId, @PathVariable Long modalityId) {
		return stageCatalogService.listAll(championshipId, modalityId);
	}

	@GetMapping("/championship/{championshipId}/modality/{modalityId}/name")
	public Set<Stage> searchNameSTAGE(@PathVariable Long championshipId, @PathVariable Long modalityId, @RequestBody Stage stage) {
		return (Set<Stage>) stageCatalogService.searchNameStage(championshipId, modalityId, stage);
	}

	@GetMapping("/championship/{championshipId}/modality/{modalityId}/{stageId}")
	public Stage search(@PathVariable Long championshipId, @PathVariable Long modalityId, @PathVariable Long stageId) {
		return stageCatalogService.search(championshipId, modalityId, stageId);
	}

	@DeleteMapping("/championship/{championshipId}/modality/{modalityId}/{stageId}")
	public Stage delete(@PathVariable Long championshipId, @PathVariable Long modalityId, @PathVariable Long stageId) {
		return stageCatalogService.delete(championshipId, modalityId, stageId);
	}
}

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

import com.conjifs.domain.model.Stage;
import com.conjifs.domain.service.StageCatalogService;
import com.conjifs.domain.service.StageRulesService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/stages")
public class StageController {
	private StageCatalogService stageCatalogService;
	private StageRulesService stageRulesService;
	
	@PostMapping("/championship/{championshipId}/modality/{modalityId}")
	public List<Stage> create(@PathVariable Long championshipId, @PathVariable Long modalityId) {
		return stageRulesService.createdStages(championshipId, modalityId);
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
	public Stage searchNameStage(@PathVariable Long championshipId, @PathVariable Long modalityId, @RequestBody Stage stage) {
		return stageCatalogService.searchNameStage(championshipId, modalityId, stage);
	}

	@GetMapping("/championship/{championshipId}/modality/{modalityId}/{stageId}")
	public Stage search(@PathVariable Long championshipId, @PathVariable Long modalityId, @PathVariable Long stageId) {
		return stageCatalogService.search(championshipId, modalityId, stageId);
	}

	@DeleteMapping("/championship/{championshipId}/modality/{modalityId}/{stageId}")
	public Set<Stage> drop(@PathVariable Long championshipId, @PathVariable Long modalityId, @PathVariable Long stageId) {
		return stageRulesService.drop(championshipId, modalityId, stageId);
	}
}

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

import com.conjifs.api.assembler.StageAssembler;
import com.conjifs.api.model.StageOut;
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
	private StageAssembler stageAssembler;
	
	@PostMapping("/championship/{championshipId}/modality/{modalityId}")
	public List<Stage> create(@PathVariable Long championshipId, @PathVariable Long modalityId) {
		return stageRulesService.createStages(championshipId, modalityId);
	}
	
	@PutMapping("/{stageId}/concluded")
	public Stage setconcluded(@PathVariable Long stageId, @RequestBody Stage stage) {
		return stageRulesService.setConcluded(stageId, stage);
	}
	
	@PutMapping("/{stageId}")
	public Stage edit(@PathVariable Long stageId, @Valid @RequestBody Stage stage) {
		return stageCatalogService.edit(stageId, stage);
	}
	
	@GetMapping("/championship/{championshipId}/modality/{modalityId}/current")
	public Stage searchStageCurrent(@PathVariable Long championshipId, @PathVariable Long modalityId) {
		return stageCatalogService.searchStageCurrent(championshipId, modalityId); 
	}
	
	@GetMapping("/championship/{championshipId}/modality/{modalityId}")
	public Set<Stage> listAll(@PathVariable Long championshipId, @PathVariable Long modalityId) {
		return stageCatalogService.listAll(championshipId, modalityId);
	}
	
	@GetMapping("/championship/{championshipId}/modality/{modalityId}/totem")
	public StageOut searchFirstTotem(@PathVariable Long championshipId, @PathVariable Long modalityId) {
		return stageAssembler.toOut(stageCatalogService.searchFirst(championshipId, modalityId));
	}

	@GetMapping("/championship/{championshipId}/modality/{modalityId}/nameStage")
	public Stage searchNameStage(@PathVariable Long championshipId, @PathVariable Long modalityId, @RequestBody Stage stage) {
		return stageCatalogService.searchNameStage(championshipId, modalityId, stage);
	}

	@GetMapping("/championship/{championshipId}/modality/{modalityId}/{stageId}")
	public Stage search(@PathVariable Long championshipId, @PathVariable Long modalityId, @PathVariable Long stageId) {
		return stageCatalogService.search(championshipId, modalityId, stageId);
	}
	
	@DeleteMapping("/championship/{championshipId}/modality/{modalityId}/stage/{stageId}/drop")
	public Set<Stage> drop(@PathVariable Long championshipId, @PathVariable Long modalityId, @PathVariable Long stageId) {
		return stageRulesService.drop(championshipId, modalityId, stageId);
	}
	@DeleteMapping("/championship/{championshipId}/modality/{modalityId}/{stageId}")
	public Stage delete(@PathVariable Long championshipId, @PathVariable Long modalityId, @PathVariable Long stageId) {
		return stageCatalogService.delete(championshipId, modalityId, stageId);
	}
}

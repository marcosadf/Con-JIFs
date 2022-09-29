package com.conjifis.api.controller;

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

import com.conjifis.domain.model.Modality;
import com.conjifis.domain.service.ModalityCatalogService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/modalities")
public class ModalityController {
	private ModalityCatalogService modalityCatalogService;
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Modality add(@Valid @RequestBody Modality modality) {
		return modalityCatalogService.save(modality);
	}

	@PutMapping("/{modalityId}")
	public Modality edit(@PathVariable Long modalityId, @Valid @RequestBody Modality modality) {
		modality.setId(modalityId);
		return modalityCatalogService.edit(modality);
	}

	@GetMapping("/championship/{championshipId}")
	public Set<Modality> listAll(@PathVariable Long championshipId) {
		return modalityCatalogService.listAll(championshipId);
	}

	@GetMapping("/championship/{championshipId}/name")
	public Set<Modality> searchName(@PathVariable Long championshipId, @RequestBody Modality modality) {
		return modalityCatalogService.searchName(championshipId, modality);
	}

	@GetMapping("/championship/{championshipId}/{modalityId}")
	public Modality search(@PathVariable Long championshipId, @PathVariable Long modalityId) {
		return modalityCatalogService.search(championshipId, modalityId);
	}

	@DeleteMapping("/championship/{championshipId}/{modalityId}")
	public Modality delete(@PathVariable Long championshipId, @PathVariable Long modalityId) {
		return modalityCatalogService.delete(championshipId, modalityId);
	}
}

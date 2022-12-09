package com.conjifs.domain.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.conjifs.config.LocaleConfig;
import com.conjifs.domain.exception.BusinessException;
import com.conjifs.domain.exception.EntityNotFoundException;
import com.conjifs.domain.model.Championship;
import com.conjifs.domain.model.Modality;
import com.conjifs.domain.model.TypeCompetition;
import com.conjifs.domain.repository.ModalityRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class ModalityCatalogService {
	private ModalityRepository modalityRepository;
	private ChampionshipCatalogService championshipCatalogService;
	private MessageSource messageSource = new LocaleConfig().messageSource();
	
	@Transactional
	public Modality search(Long championshipId, Long modalityId) {
		Set<Modality> modalities = listAll(championshipId);
		Optional<List<Modality>> modalitiesList = Optional.of(modalities.stream().filter(t -> t.getId().equals(modalityId)).toList());
				
		Optional<Modality> modality = (modalitiesList.isPresent() ? (!modalitiesList.get().isEmpty() ? Optional.of(modalitiesList.get().get(0)) : Optional.empty()): Optional.empty());
		return modality.orElseThrow(() -> 
			new EntityNotFoundException(
				messageSource.getMessage("modality.not.found", null, LocaleContextHolder.getLocale())
			)
		);
	}
	
	@Transactional
	public Set<Modality> listAll(Long championshipId) {
		Championship championship = championshipCatalogService.search(championshipId);
		return modalityRepository.findByChampionship(championship);
	}
	
	@Transactional
	public Set<Modality> searchName(Long championshipId, Modality modality) {
		return new HashSet<>(listAll(championshipId).stream()
				.filter(m -> m.getName().contains(modality.getName())).toList()); 
	}
	
	@Transactional
	public Modality save(Modality modality) {
		Championship c = championshipCatalogService.search(modality.getChampionship().getId());
		modality.setChampionship(c);
		boolean nameUsed = listAll(modality.getChampionship().getId()).stream()
				.filter(m -> m.getName().equals(modality.getName())).toList().isEmpty();
		if(!nameUsed && modality.getId() == null) {
			throw new BusinessException(
				messageSource.getMessage("name.modality.exist", null, LocaleContextHolder.getLocale())
			);
		}
		if(!modality.getTypeCompetition().equals(TypeCompetition.BRACKET) && (modality.getGroupApprovedNumber() == null && modality.getGroupTeamsNumber() == null)) {
			throw new BusinessException(
					messageSource.getMessage("params.required.modality", null, LocaleContextHolder.getLocale())
				);
		}
		return modalityRepository.save(modality);
	}
	
	@Transactional
	public Modality edit(Long modalityId, Modality modality) {
		Modality modalityResearched = search(modality.getChampionship().getId(), modalityId);
		modality.setChampionship(championshipCatalogService.search(modality.getChampionship().getId()));
		
		modality.setId(modalityId);
		
		if(modality.equals(modalityResearched)) {
			if(modality.getTypeCompetition() != modalityResearched.getTypeCompetition()){
				modality.getStages().clear();
			}
			modalityResearched = save(modality);
		}
		return modalityResearched;
	}
		
	@Transactional
	public Modality delete(Long championshipId, Long modalityId) {
		Modality modality = search(championshipId, modalityId);
		modalityRepository.delete(modality);
		return modality;
		
	}
}

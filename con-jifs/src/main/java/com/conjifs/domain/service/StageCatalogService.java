package com.conjifs.domain.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.conjifs.config.LocaleConfig;
import com.conjifs.domain.exception.BusinessException;
import com.conjifs.domain.exception.EntityNotFoundException;
import com.conjifs.domain.model.Modality;
import com.conjifs.domain.model.Stage;
import com.conjifs.domain.model.TypeCompetition;
import com.conjifs.domain.repository.StageRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class StageCatalogService {
	private StageRepository stageRepository;
	private ModalityCatalogService modalityCatalogService;
	private MessageSource messageSource = new LocaleConfig().messageSource();
	
	@Transactional
	public Stage search(Long championshipId, Long modalityId, Long stageId) {
		Modality modality = modalityCatalogService.search(championshipId, modalityId);
		Set<Stage> stages = stageRepository.findByModality(modality);
		Optional<List<Stage>> stagesList = Optional.of(stages.stream().filter(t -> t.getId().equals(stageId)).toList());
				
		Optional<Stage> stage = (stagesList.isPresent() ? (!stagesList.get().isEmpty() ? Optional.of(stagesList.get().get(0)) : Optional.empty()): Optional.empty());
		return stage.orElseThrow(() -> 
			new EntityNotFoundException(
				messageSource.getMessage("stage.not.found", null, LocaleContextHolder.getLocale())
			)
		);
	}
	
	@Transactional
	public Stage searchFirst(Long championshipId, Long modalityId) {
		Modality modality = modalityCatalogService.search(championshipId, modalityId);
		Set<Stage> stageList = modality.getStages();
		Optional<List<Stage>> stageOpList = Optional.of(stageList.stream().filter(s -> s.getParentStage() == null).collect(Collectors.toList()));
		Optional<Stage> stageOp = (stageOpList.isPresent() ? (!stageOpList.get().isEmpty() ? Optional.of(stageOpList.get().get(0)) : Optional.empty()): Optional.empty());
		Stage stage = null;
		if(stageOp.isPresent()) {
			do{
				Stage stageAux = stageOp.get();
				stage = stageAux;
				stageOpList = Optional.of(stageList.stream().filter(s -> s.getParentStage() == stageAux).collect(Collectors.toList()));
				stageOp = (stageOpList.isPresent() ? (!stageOpList.get().isEmpty() ? Optional.of(stageOpList.get().get(0)) : Optional.empty()): Optional.empty());
			}while(stageOp.isPresent());
			return stage;
		}else {
			throw new EntityNotFoundException(
				messageSource.getMessage("stage.not.found", null, LocaleContextHolder.getLocale())
			);
		}
	}
	
	@Transactional
	public Set<Stage> listAll(Long championshipId, Long modalityId) {
		Modality modality = modalityCatalogService.search(championshipId, modalityId);
		return modality.getStages();
	}
	
	@Transactional
	public Stage save(Stage stage) {
		Modality modality = modalityCatalogService.search(
				stage.getModality().getChampionship().getId(),
				stage.getModality().getId());
		boolean nameUsed = listAll(modality.getChampionship().getId(), modality.getId()).stream()
				.filter(t -> t.getNameStage().equals(stage.getNameStage())).toList().isEmpty();
		if(!nameUsed) {
			throw new BusinessException(
				messageSource.getMessage("stage.invalid.modality", null, LocaleContextHolder.getLocale())
			);
		}
		stage.setModality(modality);
		return stageRepository.save(stage);
	}
	
	@Transactional
	public Stage edit(Long stageId,Stage stage) {
		Modality modality = modalityCatalogService.search(
				stage.getModality().getChampionship().getId(),
				stage.getModality().getId());
		
		Stage stageResearched = search(modality.getChampionship().getId(), modality.getId(), stageId);
		
		stage.setId(stageId);
		
		if(stage.equals(stageResearched)) {
			if(stage.getConcluded() == false && stageResearched.getConcluded() == true) {
				if(stage.getParentStage().getConcluded()) {
					throw new EntityNotFoundException(
							messageSource.getMessage("stage.not.concluded.next.stage", null, LocaleContextHolder.getLocale())
						);
				}
			} else if(stage.getConcluded() == true && stageResearched.getConcluded() == false) {
				throw new EntityNotFoundException(
						messageSource.getMessage("stage.not.concluded", null, LocaleContextHolder.getLocale())
					);
			}
			stageResearched = save(stage);
		}
		return stageResearched;
	}
	
	@Transactional
	public Stage searchNameStage(Long championshipId, Long modalityId, Stage stage) {
		 List<Stage> stages = listAll(championshipId, modalityId).stream()
			.filter(t -> t.getNameStage().equals(stage.getNameStage())).toList();
		
		 if(stages.isEmpty()) {
			throw new EntityNotFoundException(
				messageSource.getMessage("stage.not.found", null, LocaleContextHolder.getLocale())
			);
		 }

		 return stages.get(0);
	}
	
	@Transactional
	public Optional<Stage> searchParentStage(Stage stage) {
		return stageRepository.findByParentStage(stage);
	}
	
	@Transactional
	public Stage delete(Long championshipId, Long modalityId, Long stageId) {
		Stage stage = search(championshipId, modalityId, stageId);
		stageRepository.delete(stage);
		return stage;
	}
	
	@Transactional
	public Stage searchStageCurrent(Long championshipId, Long modalityId) {
		Modality modality = modalityCatalogService.search(championshipId, modalityId);
		List<Stage> stageList = modality.getStages().stream().toList(); 
		Optional<List<Stage>> stageOpList = Optional.of(stageList.stream().filter(s -> {return s.getParentStage() == null;}).toList());
		Optional<Stage> stageOp = (stageOpList.isPresent() ? (!stageOpList.get().isEmpty() ? Optional.of(stageOpList.get().get(0)) : Optional.empty()): Optional.empty());
		Stage stage = null;
		if(stageOp.isPresent()) {
			if(modality.getTypeCompetition() != TypeCompetition.GROUP) {
				do{
					Stage stageAux = stageOp.get();
					stage = stageAux;
					stageOpList = Optional.of(stageList.stream().filter(s -> s.getParentStage() == stageAux).collect(Collectors.toList()));
					stageOp = (stageOpList.isPresent() ? (!stageOpList.get().isEmpty() ? Optional.of(stageOpList.get().get(0)) : Optional.empty()): Optional.empty());
				}while(stageOp.isPresent());
				if(stage.getConcluded()) {
					while(stage.getParentStage() != null) {
						stage = stage.getParentStage();
						if(!stage.getConcluded())
							return stage;
					}
				}else {
					return stage;
				}
			}else {
				return stageOp.get();
			}
		}else {
			throw new EntityNotFoundException(
					messageSource.getMessage("stage.not.found", null, LocaleContextHolder.getLocale())
				); 
		}
		return null;
	}
}

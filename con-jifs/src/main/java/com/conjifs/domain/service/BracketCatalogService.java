package com.conjifs.domain.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.conjifs.config.LocaleConfig;
import com.conjifs.domain.exception.BusinessException;
import com.conjifs.domain.exception.EntityNotFoundException;
import com.conjifs.domain.model.Bracket;
import com.conjifs.domain.model.NameStage;
import com.conjifs.domain.model.Stage;
import com.conjifs.domain.repository.BracketRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class BracketCatalogService {
	private BracketRepository bracketRepository;
	private StageCatalogService stageCatalogService;
	private ModalityCatalogService modalityCatalogService;
	private MessageSource messageSource = new LocaleConfig().messageSource();

	@Transactional
	public Bracket search(Long championshipId, Long modalityId, Long stageId, Long bracketId) {
		Stage stage = stageCatalogService.search(championshipId, modalityId, stageId);
		Set<Bracket> brackets = bracketRepository.findByStage(stage);
				
		List<Bracket> bracketsList = brackets.stream().filter(t -> t.getId().equals(bracketId)).collect(Collectors.toList());
		if(bracketsList.isEmpty()) {
			throw new EntityNotFoundException(messageSource.getMessage("bracket.not.found", null, LocaleContextHolder.getLocale()));
		}
		
		return bracketsList.get(0); 
	}

	@Transactional
	public Set<Bracket> listAll(Long championshipId, Long modalityId, Long stageId) {
		Stage stage = stageCatalogService.search(championshipId, modalityId, stageId);
		return stage.getBrackets();
	}

	@Transactional
	public Bracket save(Bracket bracket) {
		Stage stage = stageCatalogService.search(bracket.getStage().getModality().getChampionship().getId(), 
				bracket.getStage().getModality().getId(),
				bracket.getStage().getId()
			);
		List<Bracket> nameUsed = listAll(stage.getModality().getChampionship().getId(), stage.getModality().getId(), stage.getId()).stream()
				.filter(b -> b.getName().equals(bracket.getName())).toList();
		if (!nameUsed.isEmpty()) {
			if(nameUsed.get(0).getId() != bracket.getId()) {
				throw new BusinessException(
						messageSource.getMessage("bracket.invalid.stage", null, LocaleContextHolder.getLocale()));
			}
		}
		bracket.setStage(stage);
		return bracketRepository.save(bracket);
	}

	@Transactional
	public Bracket edit(Long bracketId, Bracket bracket) {
		Stage stage = stageCatalogService.search(bracket.getStage().getModality().getChampionship().getId(),
				bracket.getStage().getModality().getId(),
				bracket.getStage().getId());

		Bracket bracketResearched = search(stage.getModality().getChampionship().getId(), stage.getModality().getId(), stage.getId(), bracketId);

		bracket.setId(bracketId);

		if (bracket.equals(bracketResearched)) {
			bracketResearched = save(bracket);
		}
		return bracketResearched;
	}

	@Transactional
	public Bracket searchName(Long championshipId, Long modalityId, Long stageId, Bracket bracket) {
		List<Bracket> brackets = listAll(championshipId, modalityId, stageId).stream()
				.filter(b -> b.getName().equals(bracket.getName())).toList();

		if (brackets.isEmpty()) {
			throw new EntityNotFoundException(
					messageSource.getMessage("bracket.not.found", null, LocaleContextHolder.getLocale()));
		}

		return brackets.get(0);
	}

	@Transactional
	public Set<Bracket> searchParentBracket(Bracket bracket) {
		return bracketRepository.findByParentBracket(bracket);
	}

	public Set<Bracket> listGroupAll(Long championshipId, Long modalityId) {
		List<Stage> stages = modalityCatalogService.search(championshipId, modalityId).getStages().stream().filter(s -> {return s.getNameStage() == NameStage.GROUP;}).collect(Collectors.toList());
		if(!stages.isEmpty()){
			return stages.get(0).getBrackets();
		}
		return new HashSet<Bracket>();
	}

}

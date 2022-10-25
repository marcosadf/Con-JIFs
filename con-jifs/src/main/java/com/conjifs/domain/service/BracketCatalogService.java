package com.conjifs.domain.service;

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
import com.conjifs.domain.model.Bracket;
import com.conjifs.domain.model.Stage;
import com.conjifs.domain.repository.BracketRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class BracketCatalogService {
	private BracketRepository bracketRepository;
	private StageCatalogService stageCatalogService;
	private MessageSource messageSource = new LocaleConfig().messageSource();

	@Transactional
	public Bracket search(Long championshipId, Long modalityId, Long stageId, Long bracketId) {
		Stage stage = stageCatalogService.search(championshipId, modalityId, stageId);
		Set<Bracket> brackets = bracketRepository.findByStage(stage);
				
		Optional<List<Bracket>> bracketsList = Optional.of(brackets.stream().filter(t -> t.getId().equals(bracketId)).toList());

		Optional<Bracket> bracket = (bracketsList.isPresent() ? (!bracketsList.get().isEmpty() ? Optional.of(bracketsList.get().get(0)) : Optional.empty()): Optional.empty());
		return bracket.orElseThrow(() -> new EntityNotFoundException(
				messageSource.getMessage("bracket.not.found", null, LocaleContextHolder.getLocale())));
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
		boolean nameUsed = listAll(stage.getModality().getChampionship().getId(), stage.getModality().getId(), stage.getId()).stream()
				.filter(b -> b.getName().equals(bracket.getName())).toList().isEmpty();
		if (!nameUsed) {
			throw new BusinessException(
					messageSource.getMessage("bracket.invalid.stage", null, LocaleContextHolder.getLocale()));
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

}

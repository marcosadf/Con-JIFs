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
import com.conjifs.domain.model.Compete;
import com.conjifs.domain.model.Team;
import com.conjifs.domain.repository.CompeteRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class CompeteCatalogService {
	private BracketCatalogService bracketCatalogService;
	private CompeteRepository competeRepository;
	private TeamCatalogService teamCatalogService;
	private MessageSource messageSource = new LocaleConfig().messageSource();
	
	@Transactional
	public Compete search(Long championshipId, Long modalityId, Long stageId, Long bracketId, Long competeId) {
		Bracket bracket = bracketCatalogService.search(championshipId, modalityId, stageId, bracketId);
		Set<Compete> competes = competeRepository.findByBracket(bracket);
				
		Optional<List<Compete>> competesList = Optional.of(competes.stream().filter(c -> c.getId().equals(competeId)).toList());

		Optional<Compete> compete = (competesList.isPresent() ? (!competesList.get().isEmpty() ? Optional.of(competesList.get().get(0)) : Optional.empty()): Optional.empty());
		return compete.orElseThrow(() -> new EntityNotFoundException(
				messageSource.getMessage("compete.not.found", null, LocaleContextHolder.getLocale())));
	}
	
	@Transactional
	public Compete searchTeamStage(Long championshipId, Long modalityId, Long stageId, Long teamId) {
		Set<Bracket> brackets = bracketCatalogService.listAll(championshipId, modalityId, stageId);
		Team team = teamCatalogService.search(championshipId, modalityId, teamId);
		Optional<Compete> compete = Optional.empty();
		for (Compete c : team.getCompetes()) {
			for (Bracket bracket : brackets) {
				if(c.getBracket().equals(bracket)) {
					compete = Optional.of(c);
				}
			}
		}
		return compete.orElseThrow(() -> new EntityNotFoundException(
				messageSource.getMessage("compete.not.found", null, LocaleContextHolder.getLocale())));
	}
	
	@Transactional
	public Set<Compete> listAllBracket(Long championshipId, Long modalityId, Long stageId, Long bracketId) {
		Bracket bracket = bracketCatalogService.search(championshipId, modalityId, stageId, bracketId);
		return bracket.getCompetes();
	}
	
	@Transactional
	public Compete save(Compete compete) {
		Long championshipId = compete.getBracket().getStage().getModality().getChampionship().getId();
		Long modalityId = compete.getBracket().getStage().getModality().getId();
		Long stageId = compete.getBracket().getStage().getId();
		Long bracketId = compete.getBracket().getId();
		Long teamId = compete.getTeam().getId();
		Team team = teamCatalogService.search(championshipId, modalityId, teamId);
		Bracket bracket = bracketCatalogService.search(championshipId, modalityId, stageId, bracketId);
		
		List<Compete> competeResearched = listAllBracket(championshipId, modalityId, stageId, bracketId).stream().filter(c -> c.getTeam().equals(team)).toList();
		
		if (!competeResearched.isEmpty()) {
			throw new BusinessException(
					messageSource.getMessage("compete.invalid.stage", null, LocaleContextHolder.getLocale()));
		}
		compete.setTeam(team);
		compete.setBracket(bracket);
		return competeRepository.save(compete);
	}
	
	@Transactional
	public Compete edit(Long competeId, Compete compete) {
		Bracket bracket = bracketCatalogService.search(compete.getBracket().getStage().getModality().getChampionship().getId(),
				compete.getBracket().getStage().getModality().getId(),
				compete.getBracket().getStage().getId(),
				compete.getId());

		Compete competeResearched = search(bracket.getStage().getModality().getChampionship().getId(),
				bracket.getStage().getModality().getId(),
				bracket.getStage().getId(),
				bracket.getId(),
				competeId);

		compete.setId(competeId);

		if (compete.equals(competeResearched)) {
			competeResearched = save(compete);
		}
		return competeResearched;
	}
	
	@Transactional
	public Compete delete(Long championshipId, Long modalityId, Long stageId, Long bracketId, Long competeId) {
		Compete compete = search(championshipId, modalityId, stageId, bracketId, competeId);
		competeRepository.delete(compete);
		return compete;
	}
	
	@Transactional
	public void clear(Long championshipId, Long modalityId, Long stageId, Long bracketId) {
		bracketCatalogService.search(championshipId, modalityId, stageId, bracketId).getCompetes().forEach(c -> {
			delete(championshipId, modalityId, stageId, bracketId, c.getId());
		});
	}

}

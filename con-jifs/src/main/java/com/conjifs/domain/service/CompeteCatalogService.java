package com.conjifs.domain.service;

import java.util.ArrayList;
import java.util.HashSet;
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
import com.conjifs.domain.model.Bracket;
import com.conjifs.domain.model.Compete;
import com.conjifs.domain.model.NameStage;
import com.conjifs.domain.model.Stage;
import com.conjifs.domain.model.Team;
import com.conjifs.domain.repository.CompeteRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class CompeteCatalogService {
	private BracketCatalogService bracketCatalogService;
	private CompeteRepository competeRepository;
	private TeamCatalogService teamCatalogService;
	public StageCatalogService stageCatalogService;
	private ModalityCatalogService modalityCatalogService;
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
	
	public Set<Team> listAllForGroup(Long championshipId, Long modalityId, Long bracketId) {
		List<Stage> stages = modalityCatalogService.search(championshipId, modalityId).getStages().stream().filter(s -> {return s.getNameStage() == NameStage.GROUP;}).collect(Collectors.toList());
		if(!stages.isEmpty()){
			return listAllBracket(championshipId, modalityId, stages.get(0).getId(), bracketId).stream().map(c -> {return c.getTeam();}).collect(Collectors.toSet());
		}
		return new HashSet<Team>();
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
			competeRepository.delete(c);
		});
	}
	
	@Transactional
	public void clearAll(Stage stage) {
		do {
			stage.getBrackets().forEach(b -> {
				b.getCompetes().forEach(c -> {
					competeRepository.delete(c);
				});
			});
			stage = stage.getParentStage();
		}while(stage != null);
	}

	public List<List<Compete>> listAllStage(Long championshipId, Long modalityId, Long stageId) {
		Stage stage = stageCatalogService.search(championshipId, modalityId, stageId);
		List<List<Compete>> listCompetesList = new ArrayList<>();
		stage.getBrackets().forEach(b ->{
			listCompetesList.add(b.getCompetes().stream().collect(Collectors.toList()));
		});;
		return listCompetesList;
	}
}

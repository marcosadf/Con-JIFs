package com.conjifs.domain.service;

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
import com.conjifs.domain.model.Dispute;
import com.conjifs.domain.model.Match;
import com.conjifs.domain.model.NameStage;
import com.conjifs.domain.model.Stage;
import com.conjifs.domain.model.Team;
import com.conjifs.domain.repository.DisputeRepository;
import com.conjifs.domain.repository.MatchRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class MatchCatalogService {
	private BracketCatalogService bracketCatalogService;
	private MatchRepository matchRepository;
	private DisputeRepository disputeRepository;
	private TeamCatalogService teamCatalogService;
	private MessageSource messageSource = new LocaleConfig().messageSource();
	
	@Transactional
	public Match searchForBracket(Long championshipId, Long modalityId, Long stageId, Long bracketId, Long matchId) {
		Bracket bracket = bracketCatalogService.search(championshipId, modalityId, stageId, bracketId);
		Set<Match> matchs = matchRepository.findByBracket(bracket);
				
		List<Match> matchsList = matchs.stream().filter(c -> c.getId().equals(matchId)).collect(Collectors.toList());

		if(matchsList.isEmpty()) {
			throw new EntityNotFoundException(messageSource.getMessage("match.not.found", null, LocaleContextHolder.getLocale()));
		}
		return matchsList.get(0);
	}
	
	@Transactional
	public Match searchForTeam(Long championshipId, Long modalityId, Long teamId, Long matchId) {
		Team team = teamCatalogService.search(championshipId, modalityId, teamId);
		Optional<List<Dispute>> disputesOp = Optional.of(team.getDisputes().stream().filter(d -> d.getMatch().getId().equals(matchId)).toList());
		Optional<Dispute> disputeOp = (disputesOp.isPresent() ? (!disputesOp.get().isEmpty() ? Optional.of(disputesOp.get().get(0)) : Optional.empty()): Optional.empty());
		
		Optional<Match> match = Optional.empty();
		if(disputeOp.isPresent()) {
			match = matchRepository.findById(disputeOp.get().getMatch().getId());
		}
		
		return match.orElseThrow(() -> new EntityNotFoundException(
				messageSource.getMessage("match.not.found", null, LocaleContextHolder.getLocale())));
	}
	
	@Transactional
	public Set<Match> listAllTeam(Long championshipId, Long modalityId, Long teamId) {
		Team team = teamCatalogService.search(championshipId, modalityId, teamId);
		Set<Match> matchs = new HashSet<>();
		team.getDisputes().stream().forEach(d -> {
			matchs.add(d.getMatch());
		});
		return matchs;
	}
	
	@Transactional
	public Set<Match> listAllBracket(Long championshipId, Long modalityId, Long stageId, Long bracketId) {
		Bracket bracket = bracketCatalogService.search(championshipId, modalityId, stageId, bracketId);
		return bracket.getMatchs();
	}
	
	@Transactional
	public Match save(Match match) {
		Long championshipId = match.getBracket().getStage().getModality().getChampionship().getId();
		Long modalityId = match.getBracket().getStage().getModality().getId();
		Long stageId = match.getBracket().getStage().getId();
		Long bracketId = match.getBracket().getId();
		Bracket bracket = bracketCatalogService.search(championshipId, modalityId, stageId, bracketId);
		match.setBracket(bracket);
		
		List<Match> matchResearched = listAllBracket(championshipId, modalityId, stageId, bracketId).stream().collect(Collectors.toList());
		
		if (!matchResearched.isEmpty()&& match.getId() != null) {
			if(bracket.getStage().getNameStage() != NameStage.GROUP && !matchResearched.get(0).equals(match)) {
				throw new BusinessException(
					messageSource.getMessage("match.invalid.stage", null, LocaleContextHolder.getLocale()));
			}
		}
		System.out.println(match.getLocale());
		return matchRepository.save(match);
	}
	
	@Transactional
	public Match edit(Long matchId, Match match) {
		match.setId(matchId);
		return save(match);
	}
	
	@Transactional
	public Match deleteForBracket(Long championshipId, Long modalityId, Long stageId, Long bracketId, Long matchId) {
		Match match = searchForBracket(championshipId, modalityId, stageId, bracketId, matchId);
		matchRepository.delete(match);
		return match;
	}
	
	@Transactional
	public Match deleteForTeam(Long championshipId, Long modalityId, Long teamId, Long matchId) {
		Match match = searchForTeam(championshipId, modalityId, teamId, matchId);
		matchRepository.delete(match);
		return match;
	}
	
	
	@Transactional
	public Match clear(Long championshipId, Long modalityId, Long stageId, Long bracketId, Long matchId) {
		Match match = searchForBracket(championshipId, modalityId, stageId, bracketId, matchId);
		match.setDateTime("01/01/2000 00:00");
		match.setLocale("Undefined");
		match.getDisputes().forEach(d -> {
			d.setPoints(0);
			disputeRepository.save(d);
		});
		return save(match);
	}
	
	@Transactional
	public void clearAll(Stage stage) {
		do {
			stage.getBrackets().forEach(b -> {
				 b.getMatchs().forEach( m -> {
					m.getDisputes().forEach(d -> {
						d.setPoints(0);
						disputeRepository.save(d);
					});
					m.setDateTime("01/01/2000 00:00");
					m.setLocale("Undefined");
					save(m);
				});
			});
			stage = stage.getParentStage();
		}while(stage != null);
	}

	public void deleteAllStage(Stage stage) {
		do {
			stage.getBrackets().forEach(b -> {
				 b.getMatchs().forEach( m -> {
					 matchRepository.delete(m);
				});
			});
			stage = stage.getParentStage();
		}while(stage != null);
	}

	public void deleteAllBracket(Long championshipId, Long modalityId, Long stageId, Long bracketId) {
		bracketCatalogService.search(championshipId, modalityId, stageId, bracketId).getMatchs().forEach(m -> {
			matchRepository.delete(m);
		});
		
	}
}

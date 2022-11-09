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
import com.conjifs.domain.model.Bracket;
import com.conjifs.domain.model.Dispute;
import com.conjifs.domain.model.Match;
import com.conjifs.domain.model.Team;
import com.conjifs.domain.repository.DisputeRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class DisputeCatalogService { 
	private MatchCatalogService matchCatalogService;
	private DisputeRepository disputeRepository;
	private TeamCatalogService teamCatalogService;
	private BracketCatalogService bracketCatalogService;
	private MessageSource messageSource = new LocaleConfig().messageSource();
	
	@Transactional
	public Dispute search(Long championshipId, Long modalityId, Long stageId, Long bracketId, Long matchId, Long disputeId) {
		Match match = matchCatalogService.searchForBracket(championshipId, modalityId, stageId, bracketId, matchId);
		Set<Dispute> disputes = disputeRepository.findByMatch(match);
				
		Optional<List<Dispute>> disputesList = Optional.of(disputes.stream().filter(c -> c.getId().equals(disputeId)).toList());

		Optional<Dispute> dispute = (disputesList.isPresent() ? (!disputesList.get().isEmpty() ? Optional.of(disputesList.get().get(0)) : Optional.empty()): Optional.empty());
		return dispute.orElseThrow(() -> new EntityNotFoundException(
				messageSource.getMessage("dispute.not.found", null, LocaleContextHolder.getLocale())));
	}
	
	@Transactional
	public Set<Dispute> searchTeamBracket(Long championshipId, Long modalityId, Long stageId, Long bracketId, Long teamId) {
		Bracket bracket = bracketCatalogService.search(championshipId, modalityId, stageId, bracketId);
		Team team = teamCatalogService.search(championshipId, modalityId, teamId);
		Set<Dispute> disputes = new HashSet<>();
		for (Dispute d : team.getDisputes()) {
			for (Match m : bracket.getMatchs()) {
				if(d.getMatch().equals(m)) {
					disputes.add(d);
				}
			}
		}
		return disputes;
	}
	
	@Transactional
	public Set<Dispute> listAllMatch(Long championshipId, Long modalityId, Long stageId, Long bracketId, Long matchId) {
		Match match = matchCatalogService.searchForBracket(championshipId, modalityId, stageId, bracketId, matchId);
		return match.getDisputes();
	}
	
	@Transactional
	public Dispute save(Dispute dispute) {
		Long championshipId = dispute.getMatch().getBracket().getStage().getModality().getChampionship().getId();
		Long modalityId = dispute.getMatch().getBracket().getStage().getModality().getId();
		Long stageId = dispute.getMatch().getBracket().getStage().getId();
		Long bracketId = dispute.getMatch().getBracket().getId();dispute.getMatch();
		Long matchId = dispute.getMatch().getId();
		Long teamId = dispute.getTeam().getId();
		Team team = teamCatalogService.search(championshipId, modalityId, teamId);
		Match match = matchCatalogService.searchForBracket(championshipId, modalityId, stageId, bracketId, matchId);
		
		List<Dispute> disputeResearched = listAllMatch(championshipId, modalityId, stageId, bracketId,matchId).stream().filter(c -> c.getTeam().equals(team)).toList();
		
		if (!disputeResearched.isEmpty()) {
			throw new BusinessException(
					messageSource.getMessage("dispute.invalid.stage", null, LocaleContextHolder.getLocale()));
		}
		dispute.setTeam(team);
		dispute.setMatch(match);
		return disputeRepository.save(dispute);
	}
	
	@Transactional
	public Dispute edit(Long disputeId, Dispute dispute) {
		Long championshipId = dispute.getMatch().getBracket().getStage().getModality().getChampionship().getId();
		Long modalityId = dispute.getMatch().getBracket().getStage().getModality().getId();
		Long stageId = dispute.getMatch().getBracket().getStage().getId();
		Long bracketId = dispute.getMatch().getBracket().getId();dispute.getMatch();
		Long matchId = dispute.getMatch().getId();
		Long teamId = dispute.getTeam().getId();
		Team team = teamCatalogService.search(championshipId, modalityId, teamId);
		Match match = matchCatalogService.searchForBracket(championshipId, modalityId, stageId, bracketId, matchId);

		Dispute disputeResearched = search(championshipId, modalityId, stageId, bracketId, matchId, bracketId);

		dispute.setId(disputeId);
		dispute.setMatch(match);
		dispute.setTeam(team);

		if (dispute.equals(disputeResearched)) {
			disputeResearched = save(dispute);
		}
		return disputeResearched;
	}
	
	@Transactional
	public Dispute delete(Long championshipId, Long modalityId, Long stageId, Long bracketId, Long matchId, Long disputeId) {
		Dispute dispute = search(championshipId, modalityId, stageId, bracketId, disputeId, matchId);
		disputeRepository.delete(dispute);
		return dispute;
	}
	
	@Transactional
	public Match clear(Long championshipId, Long modalityId, Long stageId, Long bracketId, Long matchId) {
		Match match = matchCatalogService.searchForBracket(championshipId, modalityId, stageId, bracketId, matchId);
		match.getDisputes().forEach(d -> {
			delete(championshipId, modalityId, stageId, bracketId, matchId, d.getId());
		});
		match = matchCatalogService.searchForBracket(championshipId, modalityId, stageId, bracketId, matchId);
		return match;
	}
}

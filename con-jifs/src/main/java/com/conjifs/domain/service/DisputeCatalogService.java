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
import com.conjifs.domain.model.Dispute;
import com.conjifs.domain.model.Match;
import com.conjifs.domain.model.Stage;
import com.conjifs.domain.model.Team;
import com.conjifs.domain.repository.DisputeRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class DisputeCatalogService { 
	private MatchCatalogService matchCatalogService;
	private DisputeRepository disputeRepository;
	private TeamCatalogService teamCatalogService;
	private StageCatalogService stageCatalogService;
	private BracketCatalogService bracketCatalogService;
	private MessageSource messageSource = new LocaleConfig().messageSource();
	
	@Transactional
	public Dispute search(Long championshipId, Long modalityId, Long stageId, Long bracketId, Long matchId, Long disputeId) {
		Match match = matchCatalogService.searchForBracket(championshipId, modalityId, stageId, bracketId, matchId);
		List<Dispute> disputes = disputeRepository.findByMatch(match).stream().filter(c -> c.getId().equals(disputeId)).collect(Collectors.toList());
		if(disputes.isEmpty()) {	
			throw new EntityNotFoundException(messageSource.getMessage("dispute.not.found", null, LocaleContextHolder.getLocale()));
		}
		return disputes.get(0);
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
	public List<List<List<Dispute>>> listAllStageForBracket(Long championshipId, Long modalityId, Long stageId) {
		Stage stage = stageCatalogService.search(championshipId, modalityId, stageId);
		return stage.getBrackets().stream().map(b -> {
				return b.getMatchs();
			}).map(lM -> {
				return lM.stream().map(m -> {
					return m.getDisputes().stream().collect(Collectors.toList());
				}).collect(Collectors.toList());
			}).collect(Collectors.toList());

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
		
		List<Dispute> disputeResearched = listAllMatch(championshipId, modalityId, stageId, bracketId,matchId).stream().filter(c -> c.getTeam().equals(team)).collect(Collectors.toList());
		
		if (!disputeResearched.isEmpty()&& dispute.getId() == null) {
			throw new BusinessException(messageSource.getMessage("dispute.invalid.stage", null, LocaleContextHolder.getLocale()));
		}else if(match.getDisputes().size() >= 2 && !match.getDisputes().stream().anyMatch(d -> d.equals(dispute))){
			throw new BusinessException(messageSource.getMessage("not.add.dispute", null, LocaleContextHolder.getLocale()));
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

		Dispute disputeResearched = search(championshipId, modalityId, stageId, bracketId, matchId, disputeId);

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

}

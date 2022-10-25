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
import com.conjifs.domain.model.Modality;
import com.conjifs.domain.model.Team;
import com.conjifs.domain.repository.TeamRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class TeamCatalogService {
	private TeamRepository teamRepository;
	private ModalityCatalogService modalityCatalogService;
	private MessageSource messageSource = new LocaleConfig().messageSource();
	
	@Transactional
	public Team search(Long championshipId, Long modalityId, Long teamId) {
		Modality modality = modalityCatalogService.search(championshipId, modalityId);
		Set<Team> teams = teamRepository.findByModality(modality);
		Optional<List<Team>> teamsList = Optional.of(teams.stream().filter(t -> t.getId().equals(teamId)).toList());
		Optional<Team> team = (teamsList.isPresent() ? (!teamsList.get().isEmpty() ? Optional.of(teamsList.get().get(0)) : Optional.empty()): Optional.empty());
		return team.orElseThrow(() -> 
			new EntityNotFoundException(
				messageSource.getMessage("team.not.found", null, LocaleContextHolder.getLocale())
			)
		);
	}
	
	@Transactional
	public Set<Team> listAll(Long championshipId, Long modalityId) {
		Modality modality = modalityCatalogService.search(championshipId, modalityId);
		Set<Team> teams = teamRepository.findByModality(modality);
		return teams;
	}
	
	@Transactional
	public Team save(Team team) {
		Modality modality = modalityCatalogService.search(
				team.getModality().getChampionship().getId(),
				team.getModality().getId());
		boolean nameUsed = listAll(team.getModality().getChampionship().getId(), modality.getChampionship().getId()).stream()
				.filter(t -> t.getName().equals(team.getName())).toList().isEmpty();
		if(!nameUsed) {
			throw new BusinessException(
				messageSource.getMessage("name.team.exist", null, LocaleContextHolder.getLocale())
			);
		}
		team.setModality(modality);
		return teamRepository.save(team);
	}
	
	@Transactional
	public Team edit(Long teamId, Team team) {
		Modality modality = modalityCatalogService.search(
				team.getModality().getChampionship().getId(),
				team.getModality().getId());
		
		Team teamResearched = search(modality.getChampionship().getId(), modality.getId(), teamId);
		
		team.setId(teamId);
		
		if(team.equals(teamResearched)) {
			teamResearched = save(team);
		}
		return teamResearched;
	}
	
	@Transactional
	public Set<Team> searchName(Long championshipId, Long modalityId, Team team) {
		return new HashSet<>(listAll(championshipId, modalityId).stream()
				.filter(t -> t.getName().contains(team.getName())).toList()); 
	}
	
	@Transactional
	public Team delete(Long championshipId, Long modalityId, Long teamId) {
		Team team = search(championshipId, modalityId, teamId);
		teamRepository.delete(team);
		return team;
	}
}

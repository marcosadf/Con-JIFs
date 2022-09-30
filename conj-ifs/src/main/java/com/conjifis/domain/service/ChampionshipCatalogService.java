package com.conjifis.domain.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.conjifis.config.LocaleConfig;
import com.conjifis.domain.exception.BusinessException;
import com.conjifis.domain.exception.EntityNotFoundException;
import com.conjifis.domain.model.Championship;
import com.conjifis.domain.repository.ChampionshipRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class ChampionshipCatalogService {
	private ChampionshipRepository championshipRepository;
	private MessageSource messageSource = new LocaleConfig().messageSource();
	
	@Transactional
	public Championship search(Long championshipId) {
		return championshipRepository.findById(championshipId)
				.orElseThrow(() -> new EntityNotFoundException(messageSource.getMessage("championship.not.found", null, LocaleContextHolder.getLocale())));
	}
	
	@Transactional
	public Set<Championship> listAll() {
		return new HashSet<>(championshipRepository.findAll());
	}
	
	@Transactional
	public Set<Championship> searchName(Championship championship) {
		return championshipRepository.findByNameContains(championship.getName());
	}
	
	@Transactional
	public Championship save(Championship championship) {
		boolean nameUsed = championshipRepository.findByName(championship.getName())
				.stream()
				.anyMatch(championshipExist -> !championshipExist.equals(championship));
		if(nameUsed) {
			throw new BusinessException(messageSource.getMessage("name.championship.exist", null, LocaleContextHolder.getLocale()));
		}
		return championshipRepository.save(championship);
	}
	
	@Transactional
	public Championship edit(Long championshipId, Championship championship) {
		Championship championshipResearched = search(championshipId);
		championship.setId(championshipResearched.getId());
		return save(championship);
	}
		
	@Transactional
	public Championship delete(Long championshipId) {
		Championship championship = search(championshipId);
		championshipRepository.delete(championship);
		return championship;
	}
}

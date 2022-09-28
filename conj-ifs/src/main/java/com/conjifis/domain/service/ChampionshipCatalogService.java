package com.conjifis.domain.service;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.conjifis.config.LocaleConfig;
import com.conjifis.domain.exception.BusinessException;
import com.conjifis.domain.model.Championship;
import com.conjifis.domain.repository.ChampionshipRepository;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@Service
public class ChampionshipCatalogService {
	private ChampionshipRepository championshipRepository;
	private MessageSource messageSource = new LocaleConfig().messageSource();
	
	@Transactional
	public Championship search(Long championshipId) {
		return championshipRepository.findById(championshipId)
				.orElseThrow(() -> new BusinessException(messageSource.getMessage("entity.not.found", null, LocaleContextHolder.getLocale())));
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
	public void delete(Long championshipId) {
		championshipRepository.deleteById(championshipId);
	}
}

package com.conjifs.domain.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

import com.conjifs.config.LocaleConfig;
import com.conjifs.domain.exception.BusinessException;
import com.conjifs.domain.model.Modality;
import com.conjifs.domain.model.NameStage;
import com.conjifs.domain.model.Stage;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class MatchRulesService {
	private ModalityCatalogService modalityCatalogService;
	private MessageSource messageSource = new LocaleConfig().messageSource();
	
	public void cc(Long championshipId, Long modalityId) {
		Modality modality = modalityCatalogService.search(championshipId, modalityId);
		Optional<List<Stage>> stagesOpListGroup = Optional.of(modality.getStages().stream().filter(s -> s.getNameStage().equals(NameStage.GROUP)).toList());
		Optional<Stage> stageOpGroup = (stagesOpListGroup.isPresent() ? (!stagesOpListGroup.get().isEmpty() ? Optional.of(stagesOpListGroup.get().get(0)) : Optional.empty()): Optional.empty());
		
		Optional<List<Stage>> stagesOpListBracket = Optional.of(modality.getStages().stream().filter(s -> !s.getNameStage().equals(NameStage.GROUP)).toList());
		List<Stage> stageList = stagesOpListBracket.isPresent() ? stagesOpListBracket.get() : new ArrayList<>();
		
		if(stageOpGroup.isPresent() && !stageList.isEmpty()) {
			Stage stageGroup = stageOpGroup.get();
			if(stageGroup.getConcluded()) {
				
				
				
			}else {
				throw new BusinessException(messageSource.getMessage("stage.group.not.concluded", null, LocaleContextHolder.getLocale()));
			}
		}
	}
}

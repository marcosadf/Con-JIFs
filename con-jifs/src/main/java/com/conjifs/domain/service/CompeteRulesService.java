package com.conjifs.domain.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

import com.conjifs.config.LocaleConfig;
import com.conjifs.domain.exception.BusinessException;
import com.conjifs.domain.model.Bracket;
import com.conjifs.domain.model.Compete;
import com.conjifs.domain.model.Modality;
import com.conjifs.domain.model.NameStage;
import com.conjifs.domain.model.Result;
import com.conjifs.domain.model.Stage;
import com.conjifs.domain.model.Team;
import com.conjifs.domain.model.TypeCompetition;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class CompeteRulesService {
	private CompeteCatalogService competeCatalogService;
	private ModalityCatalogService modalityCatalogService;
	private MessageSource messageSource = new LocaleConfig().messageSource();
	
	public Stage createCompetesGroup(Long championshipId, Long modalityId) {
		Modality modality = modalityCatalogService.search(championshipId, modalityId);
		Optional<List<Stage>> stagesOpListGroup = Optional.of(modality.getStages().stream().filter(s -> s.getNameStage().equals(NameStage.GROUP)).toList());
		Optional<Stage> stageOpGroup = (stagesOpListGroup.isPresent() ? (!stagesOpListGroup.get().isEmpty() ? Optional.of(stagesOpListGroup.get().get(0)) : Optional.empty()): Optional.empty());
		
		Optional<List<Stage>> stagesOpListBracket = Optional.of(modality.getStages().stream().filter(s -> !s.getNameStage().equals(NameStage.GROUP)).toList());
		List<Stage> stageList = stagesOpListBracket.isPresent() ? stagesOpListBracket.get() : new ArrayList<>();
		
		if(stageOpGroup.isPresent() && stageList.isEmpty()) {
			Stage stageGroup = stageOpGroup.get();
			List<Bracket> brackets = stageGroup.getBrackets().stream().toList();
			Boolean bracketsNoEmpty = brackets.stream().filter(b -> !b.getCompetes().isEmpty()).toList().isEmpty();
			if(bracketsNoEmpty) {
				List<Team> teams = modality.getTeams().stream().toList();
				Collections.shuffle(teams);
				Collections.shuffle(brackets);
				int numGroups = brackets.size();
				int auxGroups = 0;
				for (Team t: teams) {
					Bracket b = brackets.get(auxGroups);
					Compete compete = new Compete();
					compete.setTeam(t);
					compete.setBracket(b);
					compete = competeCatalogService.save(compete);
					t.getCompetes().add(compete);
					b.getCompetes().add(compete);
					auxGroups = auxGroups + 1 < numGroups ? auxGroups + 1: 0;
				}
				return stageGroup;
			}
			else {
				throw new BusinessException(messageSource.getMessage("stage.group.exist", null, LocaleContextHolder.getLocale()));
			}
		}
		else if(stageOpGroup.isPresent()) {
			throw new BusinessException(messageSource.getMessage("stage.function.invalid.modality", null, LocaleContextHolder.getLocale()));
		}
		else {
			throw new BusinessException(messageSource.getMessage("stage.not.found", null, LocaleContextHolder.getLocale()));
		}
	}
	
	public Stage createCompetesBracket(Long championshipId, Long modalityId){
		Modality modality = modalityCatalogService.search(championshipId, modalityId);
		Optional<List<Stage>> stagesOpListGroup = Optional.of(modality.getStages().stream().filter(s -> s.getNameStage().equals(NameStage.GROUP)).toList());
		Optional<Stage> stageOpGroup = (stagesOpListGroup.isPresent() ? (!stagesOpListGroup.get().isEmpty() ? Optional.of(stagesOpListGroup.get().get(0)) : Optional.empty()): Optional.empty());
		
		Optional<List<Stage>> stagesOpListBracket = Optional.of(modality.getStages().stream().filter(s -> !s.getNameStage().equals(NameStage.GROUP)).toList());
		List<Stage> stageList = stagesOpListBracket.isPresent() ? stagesOpListBracket.get() : new ArrayList<>();
		
		if(stageOpGroup.isEmpty() && !stageList.isEmpty()) {
			Optional<List<Stage>> stageOpList = Optional.of(stageList.stream().filter(s -> s.getParentStage() == null ).toList());
			Optional<Stage> stageOp = (stageOpList.isPresent() ? (!stageOpList.get().isEmpty() ? Optional.of(stageOpList.get().get(0)) : Optional.empty()): Optional.empty());
			
			Stage stage = null;
			
			do{
				stage = stageOp.get();
				Long stageId = stage.getId();
				stageOpList = Optional.of(stageList.stream().filter(s -> s.getParentStage().getId().equals(stageId)).toList());
				stageOp = (stageOpList.isPresent() ? (!stageOpList.get().isEmpty() ? Optional.of(stageOpList.get().get(0)) : Optional.empty()): Optional.empty());
			}while(stageOp.isPresent());
			if(!stage.getConcluded()) {
				List<Team> teams = modality.getTeams().stream().toList();
				List<Bracket> brackets = stage.getBrackets().stream().toList();
				Collections.shuffle(teams);
				int auxBracket = 0;
				int numBrackets = brackets.size();
				for (Team t: teams) {
					Bracket b = brackets.get(auxBracket);
					Compete compete = new Compete();
					compete.setTeam(t);
					compete.setBracket(b);
					compete = competeCatalogService.save(compete);
					t.getCompetes().add(compete);
					b.getCompetes().add(compete);
					auxBracket = auxBracket + 1 < numBrackets ? auxBracket + 1: 0;
				}
				return stage;
			}
			else {
				Stage lastStage;
				do{
					lastStage = stage;
					if(stage.getParentStage() != null) {
						stage = stage.getParentStage();
					}
					else {
						throw new BusinessException(messageSource.getMessage("stage.all.concluded", null, LocaleContextHolder.getLocale()));
					}
					
				}while(!stage.getConcluded());
				for (Bracket b : lastStage.getBrackets()) {
					List<Compete> approved = b.getCompetes().stream().filter(c -> c.getResult().equals(Result.APPROVED)).toList();
					if(approved.size() == 1) {
						Compete c = new Compete();
						c.setBracket(b.getParentBracket());
						c.setTeam(approved.get(0).getTeam());
						c = competeCatalogService.save(c);
						b.getParentBracket().getCompetes().add(c);
					}else{
						throw new RuntimeException();
					}
				}
				return stage;
			}
		}
		else {
			throw new BusinessException(messageSource.getMessage("stage.function.invalid.modality", null, LocaleContextHolder.getLocale()));
		}
	}
	
	public Stage createCompetesMixed(Long championshipId, Long modalityId){
		Modality modality = modalityCatalogService.search(championshipId, modalityId);
		Optional<List<Stage>> stagesOpListGroup = Optional.of(modality.getStages().stream().filter(s -> s.getNameStage().equals(NameStage.GROUP)).toList());
		Optional<Stage> stageOpGroup = (stagesOpListGroup.isPresent() ? (!stagesOpListGroup.get().isEmpty() ? Optional.of(stagesOpListGroup.get().get(0)) : Optional.empty()): Optional.empty());
		
		Optional<List<Stage>> stagesOpListBracket = Optional.of(modality.getStages().stream().filter(s -> !s.getNameStage().equals(NameStage.GROUP)).toList());
		List<Stage> stageList = stagesOpListBracket.isPresent() ? stagesOpListBracket.get() : new ArrayList<>();
		
		if(stageOpGroup.isPresent() && !stageList.isEmpty()) {
			Stage stageGroup = stageOpGroup.get();
			if(stageGroup.getConcluded()) {
				Optional<List<Stage>> stageOpList = Optional.of(stageList.stream().filter(s -> s.getParentStage() == null ).toList());
				Optional<Stage> stageOp = (stageOpList.isPresent() ? (!stageOpList.get().isEmpty() ? Optional.of(stageOpList.get().get(0)) : Optional.empty()): Optional.empty());
				
				Stage stage = null;
				
				do{
					stage = stageOp.get();
					Long stageId = stage.getId();
					stageOpList = Optional.of(stageList.stream().filter(s -> s.getParentStage().getId().equals(stageId)).toList());
					stageOp = (stageOpList.isPresent() ? (!stageOpList.get().isEmpty() ? Optional.of(stageOpList.get().get(0)) : Optional.empty()): Optional.empty());
				}while(stageOp.isPresent());
				
				if(!stage.getConcluded()) {
					List<Bracket> brackets = stage.getBrackets().stream().toList();
					Boolean bracketsNoEmpty = brackets.stream().filter(b -> !b.getCompetes().isEmpty()).toList().isEmpty();
					if(bracketsNoEmpty) {
						List<Team> teams = new ArrayList<>();
						for (Bracket b : stageGroup.getBrackets()) {
							for (Compete c : b.getCompetes()) {
								if(c.getResult().equals(Result.APPROVED)) {
									teams.add(c.getTeam());
								}
							}
						}
						Collections.shuffle(teams);
						int auxBracket = 0;
						int numBrackets = brackets.size();
						for (Team t: teams) {
							Bracket b = brackets.get(auxBracket);
							Compete compete = new Compete();
							compete.setTeam(t);
							compete.setBracket(b);
							compete = competeCatalogService.save(compete);
							t.getCompetes().add(compete);
							b.getCompetes().add(compete);
							auxBracket = auxBracket + 1 < numBrackets ? auxBracket + 1: 0;
						}
						return stage;
					}
					else {
						throw new BusinessException(messageSource.getMessage("stage.bracket.exist", null, LocaleContextHolder.getLocale()));
					}
				}
				else {
					Stage lastStage;
					do{
						lastStage = stage;
						if(stage.getParentStage() != null) {
							stage = stage.getParentStage();
						}
						else {
							throw new BusinessException(messageSource.getMessage("stage.all.concluded", null, LocaleContextHolder.getLocale()));
						}
						
					}while(!stage.getConcluded());
					for (Bracket b : lastStage.getBrackets()) {
						List<Compete> approved = b.getCompetes().stream().filter(c -> c.getResult().equals(Result.APPROVED)).toList();
						if(approved.size() == 1) {
							Compete c = new Compete();
							c.setBracket(b.getParentBracket());
							c.setTeam(approved.get(0).getTeam());
							c = competeCatalogService.save(c);
							b.getParentBracket().getCompetes().add(c);
						}else{
							throw new RuntimeException();
						}
					}
					return stage;
				}
			}
			else {
				List<Bracket> brackets = stageGroup.getBrackets().stream().collect(Collectors.toList());
				Boolean bracketsNoEmpty = brackets.stream().filter(b -> !b.getCompetes().isEmpty()).toList().isEmpty();
				if(bracketsNoEmpty) {
					List<Team> teams = modality.getTeams().stream().collect(Collectors.toList());
					System.out.println(teams.size());
					Collections.shuffle(teams);
					Collections.shuffle(brackets);
					int numGroups = brackets.size();
					int auxGroups = 0;
					for (Team t: teams) {
						Bracket b = brackets.get(auxGroups);
						Compete compete = new Compete();
						compete.setTeam(t);
						compete.setBracket(b);
						compete.setPoints(0);
						compete = competeCatalogService.save(compete);
						t.getCompetes().add(compete);
						b.getCompetes().add(compete);
						auxGroups = auxGroups + 1 < numGroups ? auxGroups + 1: 0;
					}
					System.out.println(stageGroup.getId());
					return stageGroup;
				}
				else {
					throw new BusinessException(messageSource.getMessage("stage.group.exist", null, LocaleContextHolder.getLocale())); 
				}
			}
		}
		else {
			throw new BusinessException(messageSource.getMessage("stage.function.invalid.modality", null, LocaleContextHolder.getLocale()));
		}
	}

	public Stage createCompetes(Long championshipId, Long modalityId) {
		Modality modality = modalityCatalogService.search(championshipId, modalityId);
		if(modality.getTypeCompetition().equals(TypeCompetition.MIXED))
			return createCompetesMixed(championshipId, modalityId);
		else if(modality.getTypeCompetition().equals(TypeCompetition.BRACKET))
			return createCompetesBracket(championshipId, modalityId);
		else
			return createCompetesGroup(championshipId, modalityId);
	}
}

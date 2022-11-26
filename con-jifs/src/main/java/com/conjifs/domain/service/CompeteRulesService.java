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
	
	public List<List<Compete>> createCompetesGroup(Modality modality) {
		Optional<List<Stage>> stagesOpListGroup = Optional.of(modality.getStages().stream().filter(s -> s.getNameStage().equals(NameStage.GROUP)).toList());
		Optional<Stage> stageOpGroup = (stagesOpListGroup.isPresent() ? (!stagesOpListGroup.get().isEmpty() ? Optional.of(stagesOpListGroup.get().get(0)) : Optional.empty()): Optional.empty());
		
		if(stageOpGroup.isPresent()) {
			Stage stage = stageOpGroup.get();
			List<Bracket> brackets = stage.getBrackets().stream().collect(Collectors.toList());
			Boolean bracketsNoEmpty = brackets.stream().filter(b -> !b.getCompetes().isEmpty()).toList().isEmpty();
			if(bracketsNoEmpty) {
				List<Team> teams = modality.getTeams().stream().collect(Collectors.toList());
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
				System.out.println(stage.getId());
				List<List<Compete>> listCompetesList = new ArrayList<>();
				stage.getBrackets().forEach(b ->{
					listCompetesList.add(b.getCompetes().stream().collect(Collectors.toList()));
				});;
				return listCompetesList;
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
	
	public List<List<Compete>> createCompetesBracket(Modality modality) {
		Optional<List<Stage>> stageOpList = Optional.of(modality.getStages().stream().filter(s -> s.getParentStage() == null ).toList());
		Optional<Stage> stageOp = (stageOpList.isPresent() ? (!stageOpList.get().isEmpty() ? Optional.of(stageOpList.get().get(0)) : Optional.empty()): Optional.empty());
		if(stageOp.isPresent()) {
			List<Stage> stageList = stageOpList.get();
			Stage stage = null;
		
			do{
				stage = stageOp.get();
				Long stageId = stage.getId();
				stageOpList = Optional.of(stageList.stream().filter(s -> s.getParentStage().getId().equals(stageId)).toList());
				stageOp = (stageOpList.isPresent() ? (!stageOpList.get().isEmpty() ? Optional.of(stageOpList.get().get(0)) : Optional.empty()): Optional.empty());
			}while(stageOp.isPresent());
			if(!stage.getConcluded()) {
				List<Bracket> brackets = stage.getBrackets().stream().toList();
				List<Team> teams = new ArrayList<>();
				for (Bracket b : stage.getBrackets()) {
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
				List<List<Compete>> listCompetesList = new ArrayList<>();
				stage.getBrackets().forEach(b ->{
					listCompetesList.add(b.getCompetes().stream().collect(Collectors.toList()));
				});;
				return listCompetesList;
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
				List<List<Compete>> listCompetesList = new ArrayList<>();
				stage.getBrackets().forEach(b ->{
					listCompetesList.add(b.getCompetes().stream().collect(Collectors.toList()));
				});;
				return listCompetesList;
			}
		}
		else {
			throw new BusinessException(messageSource.getMessage("stage.not.found", null, LocaleContextHolder.getLocale()));
		}
	}
	
	public List<List<Compete>> createCompetesMixed(Modality modality){
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
						List<List<Compete>> listCompetesList = new ArrayList<>();
						stage.getBrackets().forEach(b ->{
							listCompetesList.add(b.getCompetes().stream().collect(Collectors.toList()));
						});;
						return listCompetesList;
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
					List<List<Compete>> listCompetesList = new ArrayList<>();
					lastStage.getBrackets().forEach(b ->{
						listCompetesList.add(b.getCompetes().stream().collect(Collectors.toList()));
					});;
					return listCompetesList;
				}
			}
			else {
				List<Bracket> brackets = stageGroup.getBrackets().stream().collect(Collectors.toList());
				Boolean bracketsNoEmpty = brackets.stream().filter(b -> !b.getCompetes().isEmpty()).toList().isEmpty();
				if(bracketsNoEmpty) {
					List<Team> teams = modality.getTeams().stream().collect(Collectors.toList());
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
					List<List<Compete>> listCompetesList = new ArrayList<>();
					stageGroup.getBrackets().forEach(b ->{
						listCompetesList.add(b.getCompetes().stream().collect(Collectors.toList()));
					});;
					return listCompetesList;
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

	public List<List<Compete>> createCompetes(Long championshipId, Long modalityId) {
		Modality modality = modalityCatalogService.search(championshipId, modalityId);
		if(modality.getTypeCompetition().equals(TypeCompetition.MIXED))
			return createCompetesMixed(modality);
		else if(modality.getTypeCompetition().equals(TypeCompetition.BRACKET))
			return createCompetesBracket(modality);
		else
			return createCompetesGroup(modality);
	}
}

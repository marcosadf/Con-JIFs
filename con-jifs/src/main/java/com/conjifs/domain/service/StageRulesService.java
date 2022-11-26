package com.conjifs.domain.service;

import java.util.ArrayList;
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
import com.conjifs.domain.model.Bracket;
import com.conjifs.domain.model.Modality;
import com.conjifs.domain.model.NameStage;
import com.conjifs.domain.model.Result;
import com.conjifs.domain.model.Stage;
import com.conjifs.domain.model.TypeCompetition;
import com.conjifs.domain.repository.StageRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class StageRulesService {
	private StageCatalogService stageCatalogService;
	private ModalityCatalogService modalityCatalogService;
	private MessageSource messageSource = new LocaleConfig().messageSource();
	private StageRepository stageRepository;

	@Transactional
	public List<Stage> createStages(Long championshipId, Long modalityId) {
		Modality modality = modalityCatalogService.search(championshipId, modalityId);
		List<Stage> stages = modality.getStages().stream().collect(Collectors.toList());
		Stage stage = new Stage();
		if (modality.getTypeCompetition() == TypeCompetition.GROUP) {
			if (stages.isEmpty()) {
				stage.setModality(modality);
				stage.setNameStage(NameStage.GROUP);
				stage = stageCatalogService.save(stage);
			} else {
				throw new BusinessException(
						messageSource.getMessage("stage.exist", null, LocaleContextHolder.getLocale()));
			}
		} else if (modality.getTypeCompetition() == TypeCompetition.BRACKET) {
			if (stages.isEmpty()) {
				stage.setModality(modality);
				
				int numTeamBracket = modality.getTeams().size();

				if(numTeamBracket <= 2) {
					stage.setNameStage(NameStage.FINAL);
					stage = stageCatalogService.save(stage);
				} else if(numTeamBracket <= 4) {
					stage.setNameStage(NameStage.SEMIFINALS);
					Stage stageFinal = new Stage();
					stageFinal.setModality(modality);
					stageFinal.setNameStage(NameStage.FINAL);
					stage.setParentStage(stageCatalogService.save(stageFinal));
					stage = stageCatalogService.save(stage);
				} else if(numTeamBracket <= 8) {
					stage.setNameStage(NameStage.QUARTERFINALS);
					Stage stageFinal = new Stage();
					stageFinal.setModality(modality);
					stageFinal.setNameStage(NameStage.FINAL);
					Stage stageSemiFinals = new Stage();
					stageSemiFinals.setModality(modality);
					stageSemiFinals.setNameStage(NameStage.SEMIFINALS);
					stageSemiFinals.setParentStage(stageCatalogService.save(stageFinal));
					stage.setParentStage(stageCatalogService.save(stageSemiFinals));
					stage = stageCatalogService.save(stage);
				} else if(numTeamBracket <= 16) {
					stage.setNameStage(NameStage.ROUNDOF16);
					Stage stageFinal = new Stage();
					stageFinal.setModality(modality);
					stageFinal.setNameStage(NameStage.FINAL);
					Stage stageSemiFinals = new Stage();
					stageSemiFinals.setModality(modality);
					stageSemiFinals.setNameStage(NameStage.SEMIFINALS);
					Stage stageQuarterFinals = new Stage();
					stageQuarterFinals.setModality(modality);
					stageQuarterFinals.setNameStage(NameStage.QUARTERFINALS);
					stageSemiFinals.setParentStage(stageCatalogService.save(stageFinal));
					stageQuarterFinals.setParentStage(stageCatalogService.save(stageSemiFinals));
					stage.setParentStage(stageCatalogService.save(stageQuarterFinals));
					stage = stageCatalogService.save(stage);
				} else {
					throw new BusinessException(messageSource.getMessage("stage.invalid.modality", null,
							LocaleContextHolder.getLocale()));
				}
			} else {
				throw new BusinessException(
						messageSource.getMessage("stage.exist", null, LocaleContextHolder.getLocale()));
			}
		} else if (modality.getTypeCompetition() == TypeCompetition.MIXED) {
			if (stages.size() <= 1) {
				if(stages.size() != 1) {
					stage.setModality(modality);
					stage.setNameStage(NameStage.GROUP);
				}else if(stages.get(0).getNameStage() == NameStage.GROUP){
					stage = stages.get(0);
				}else {
					throw new BusinessException(messageSource.getMessage("stage.invalid.modality", null,
							LocaleContextHolder.getLocale()));
				}
				int numGroups = modality.getTeams().size() / modality.getGroupTeamsNumber();
				numGroups = modality.getTeams().size() % modality.getGroupTeamsNumber() != 0 ? numGroups + 1: numGroups;
				int numTeamBracket = numGroups * modality.getGroupApprovedNumber();
				
				if(numTeamBracket <= 2) {
					Stage stageFinal = new Stage();
					stageFinal.setNameStage(NameStage.FINAL);
					stage.setParentStage(stageCatalogService.save(stageFinal));
					stage = stageCatalogService.save(stage);
				} else if(numTeamBracket <= 4) {
					Stage stageSemiFinals = new Stage();
					stageSemiFinals.setModality(modality);
					stageSemiFinals.setNameStage(NameStage.SEMIFINALS);
					Stage stageFinal = new Stage();
					stageFinal.setModality(modality);
					stageFinal.setNameStage(NameStage.FINAL);
					stageSemiFinals.setParentStage(stageCatalogService.save(stageFinal));
					stage.setParentStage(stageCatalogService.save(stageSemiFinals));
					stage = stageCatalogService.save(stage);
				} else if(numTeamBracket <= 8) {
					Stage stageQuarterFinals = new Stage();
					stageQuarterFinals.setModality(modality);
					stageQuarterFinals.setNameStage(NameStage.QUARTERFINALS);
					Stage stageFinal = new Stage();
					stageFinal.setModality(modality);
					stageFinal.setNameStage(NameStage.FINAL);
					Stage stageSemiFinals = new Stage();
					stageSemiFinals.setModality(modality);
					stageSemiFinals.setNameStage(NameStage.SEMIFINALS);
					stageSemiFinals.setParentStage(stageCatalogService.save(stageFinal));
					stageQuarterFinals.setParentStage(stageCatalogService.save(stageSemiFinals));
					stage.setParentStage(stageCatalogService.save(stageQuarterFinals));
					stage = stageCatalogService.save(stage);
				} else if(numTeamBracket <= 16) {
					Stage stageRoundOf16 = new Stage();
					stageRoundOf16.setModality(modality);
					stageRoundOf16.setNameStage(NameStage.ROUNDOF16);
					Stage stageFinal = new Stage();
					stageFinal.setModality(modality);
					stageFinal.setNameStage(NameStage.FINAL);
					Stage stageSemiFinals = new Stage();
					stageSemiFinals.setModality(modality);
					stageSemiFinals.setNameStage(NameStage.SEMIFINALS);
					Stage stageQuarterFinals = new Stage();
					stageQuarterFinals.setModality(modality);
					stageQuarterFinals.setNameStage(NameStage.QUARTERFINALS);
					stageSemiFinals.setParentStage(stageCatalogService.save(stageFinal));
					stageQuarterFinals.setParentStage(stageCatalogService.save(stageSemiFinals));
					stageRoundOf16.setParentStage(stageCatalogService.save(stageQuarterFinals));
					stage.setParentStage(stageCatalogService.save(stageRoundOf16));
					stage = stageCatalogService.save(stage);
				} else {
					throw new BusinessException(messageSource.getMessage("stage.invalid.modality", null,
							LocaleContextHolder.getLocale()));
				}
				
			}
			else {
				throw new BusinessException(
						messageSource.getMessage("stage.invalid.modality", null, LocaleContextHolder.getLocale()));
			}
		} else {
			throw new BusinessException(
					messageSource.getMessage("stage.invalid.modality", null, LocaleContextHolder.getLocale()));
		}
		List<Stage> listStages =  new ArrayList<>();
		Stage auxStage = stage;
		while (auxStage != null) {
			listStages.add(auxStage);
			auxStage = auxStage.getParentStage();
		}
		return listStages;
	}

	public Stage setConcluded(Long stageId, Stage stage) {
		stage = stageCatalogService.search(
				stage.getModality().getChampionship().getId(), stage.getModality().getId(), stageId
				);
		List<Bracket> bracketsFltMatchs = stage.getBrackets().stream().filter(b -> {
			return !b.getMatchs().stream().filter(m -> {return m.getDisputes().isEmpty();}).toList().isEmpty();
			}).toList();

		List<Bracket> bracketsFltCompetes = stage.getBrackets().stream().filter(b -> {
			return !b.getCompetes().stream().filter(c -> {
					return c.getPoints() !=  0;
				}).toList().isEmpty();}).toList();
	
		if(stage.getNameStage().equals(NameStage.GROUP)) {
			List<Bracket> bracketsFltGroups = stage.getBrackets().stream().filter(b -> {
				return !(b.getCompetes().stream().filter(c -> {
						return c.getResult().equals(Result.APPROVED);
					}).toList().size() == b.getStage().getModality().getGroupApprovedNumber());
			}).toList();
			if(bracketsFltGroups.isEmpty()) {
				stage.setConcluded(true);
				return stageCatalogService.edit(stage.getId(), stage);
			} else {
				throw new BusinessException( messageSource.getMessage("stage.not.concluded", null, LocaleContextHolder.getLocale()));
			}
		}
		else {
			if(bracketsFltMatchs.isEmpty() && bracketsFltCompetes.isEmpty() ){
				stage.setConcluded(true);	
				return stageCatalogService.edit(stage.getId(), stage);
			} else {
				throw new BusinessException( messageSource.getMessage("stage.not.concluded", null, LocaleContextHolder.getLocale()));
			}
		}
	}

	public Set<Stage> drop(Long championshipId, Long modalityId, Long stageId) {
		Stage stage = stageCatalogService.search(championshipId, modalityId, stageId);
		Set<Stage> stages;

		if (stage.getModality().getTypeCompetition().equals(TypeCompetition.MIXED)) {
			if (stage.getNameStage().equals(NameStage.GROUP)) {
				stages = stage.getModality().getStages();
			} else {
				stages = new HashSet<>(stage.getModality().getStages().stream()
						.filter(s -> !s.getNameStage().equals(NameStage.GROUP)).toList());
			}
		} else {
			stages = stage.getModality().getStages();
		}

		stages.forEach((s) -> {
			stageRepository.delete(s);
		});

		return stages;
	}
}

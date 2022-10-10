package com.conjifs.domain.service;

import java.util.Set;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.conjifs.config.LocaleConfig;
import com.conjifs.domain.exception.BusinessException;
import com.conjifs.domain.model.Modality;
import com.conjifs.domain.model.NameStage;
import com.conjifs.domain.model.Stage;
import com.conjifs.domain.model.TypeCompetition;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class StageRulesService {
	private StageCatalogService stageCatalogService;
	private ModalityCatalogService modalityCatalogService;
	private MessageSource messageSource = new LocaleConfig().messageSource();
	
	@Transactional
	public Stage createdStage(Stage stage) {
		Modality modality = modalityCatalogService.search(stage.getModality().getChampionship().getId(), stage.getModality().getId());
		Set<Stage> stages = modality.getStages();
		
		stage.setModality(modality);
		stage.setConcluded(false);
		if(modality.getTypeCompetition() == TypeCompetition.GROUP) {
			if(stages.isEmpty()){
				if(stage.getNameStage() == NameStage.GROUP) {
					return stageCatalogService.save(stage);
				}
				else {
					throw new BusinessException(
							messageSource.getMessage("stage.invalid.modality", null, LocaleContextHolder.getLocale())
						);
				}
			}else {
				throw new BusinessException(
						messageSource.getMessage("stage.exist", null, LocaleContextHolder.getLocale())
					);
			}
		}
		else if(modality.getTypeCompetition() == TypeCompetition.BRACKET) {
			if(stages.isEmpty()){
				if(stage.getNameStage() != NameStage.GROUP) {
					if(stage.getNameStage() == NameStage.FINAL) {
						return stageCatalogService.save(stage);
					}
					else if(stage.getNameStage() == NameStage.SEMIFINALS) {
						Stage stageFinal = new Stage();
						stageFinal.setModality(modality);
						stageFinal.setNameStage(NameStage.FINAL);
						stageCatalogService.save(stageFinal);
						return stageCatalogService.save(stage);
					}
					else if(stage.getNameStage() == NameStage.QUARTERFINALS) {
						Stage stageFinal = new Stage();
						stageFinal.setModality(modality);
						stageFinal.setNameStage(NameStage.FINAL);
						Stage stageSemiFinals = new Stage();
						stageSemiFinals.setModality(modality);
						stageSemiFinals.setNameStage(NameStage.SEMIFINALS);
						stageCatalogService.save(stageFinal);
						stageCatalogService.save(stageSemiFinals);
						return stageCatalogService.save(stage);
					}
					else if(stage.getNameStage() == NameStage.ROUNDOF16) {
						Stage stageFinal = new Stage();
						stageFinal.setModality(modality);
						stageFinal.setNameStage(NameStage.FINAL);
						Stage stageSemiFinals = new Stage();
						stageSemiFinals.setModality(modality);
						stageSemiFinals.setNameStage(NameStage.SEMIFINALS);
						Stage stageQuarterFinals = new Stage();
						stageQuarterFinals.setModality(modality);
						stageQuarterFinals.setNameStage(NameStage.SEMIFINALS);
						stageCatalogService.save(stageFinal);
						stageCatalogService.save(stageSemiFinals);
						stageCatalogService.save(stageQuarterFinals);
						return stageCatalogService.save(stage);
					}
					else {
						throw new BusinessException(
								messageSource.getMessage("stage.invalid.modality", null, LocaleContextHolder.getLocale())
							);
					}
				}
				else {
					throw new BusinessException(
							messageSource.getMessage("stage.invalid.modality", null, LocaleContextHolder.getLocale())
						);
				}
			}else {
				throw new BusinessException(
						messageSource.getMessage("stage.exist", null, LocaleContextHolder.getLocale())
					);
			}
		}
		else if(modality.getTypeCompetition() == TypeCompetition.MIXED) {
			if(stages.isEmpty()){
				if(stage.getNameStage() == NameStage.GROUP) {
					return stageCatalogService.save(stage);
				}
				else {
					throw new BusinessException(
							messageSource.getMessage("stage.invalid.modality", null, LocaleContextHolder.getLocale())
						);
				}
			}else {
				if(stage.getNameStage() != NameStage.GROUP) {
					if(stage.getNameStage() == NameStage.FINAL) {
						return stageCatalogService.save(stage);
					}
					else if(stage.getNameStage() == NameStage.SEMIFINALS) {
						Stage stageFinal = new Stage();
						stageFinal.setModality(modality);
						stageFinal.setNameStage(NameStage.FINAL);
						stageCatalogService.save(stageFinal);
						return stageCatalogService.save(stage);
					}
					else if(stage.getNameStage() == NameStage.QUARTERFINALS) {
						Stage stageFinal = new Stage();
						stageFinal.setModality(modality);
						stageFinal.setNameStage(NameStage.FINAL);
						Stage stageSemiFinals = new Stage();
						stageSemiFinals.setModality(modality);
						stageSemiFinals.setNameStage(NameStage.SEMIFINALS);
						stageCatalogService.save(stageFinal);
						stageCatalogService.save(stageSemiFinals);
						return stageCatalogService.save(stage);
					}
					else if(stage.getNameStage() == NameStage.ROUNDOF16) {
						Stage stageFinal = new Stage();
						stageFinal.setModality(modality);
						stageFinal.setNameStage(NameStage.FINAL);
						Stage stageSemiFinals = new Stage();
						stageSemiFinals.setModality(modality);
						stageSemiFinals.setNameStage(NameStage.SEMIFINALS);
						Stage stageQuarterFinals = new Stage();
						stageQuarterFinals.setModality(modality);
						stageQuarterFinals.setNameStage(NameStage.SEMIFINALS);
						stageCatalogService.save(stageFinal);
						stageCatalogService.save(stageSemiFinals);
						stageCatalogService.save(stageQuarterFinals);
						return stageCatalogService.save(stage);
					}
					else {
						throw new BusinessException(
								messageSource.getMessage("stage.invalid.modality", null, LocaleContextHolder.getLocale())
							);
					}
				}
				else {
					throw new BusinessException(
							messageSource.getMessage("stage.invalid.modality", null, LocaleContextHolder.getLocale())
						);
				}
			}
		}
		else {
			throw new BusinessException(
					messageSource.getMessage("stage.invalid.modality", null, LocaleContextHolder.getLocale())
				);
		}
	}
	
	
	public Stage setConcluded(Long stageId, Stage stage) {
		stage = stageCatalogService.search(
				stage.getModality().getChampionship().getId(), stage.getModality().getId(), stageId
				);
		stage.setConcluded(true);
		return stageCatalogService.edit(stage.getId(), stage);
	}
}

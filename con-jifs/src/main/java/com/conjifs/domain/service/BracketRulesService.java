package com.conjifs.domain.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.conjifs.domain.model.Bracket;
import com.conjifs.domain.model.Modality;
import com.conjifs.domain.model.NameStage;
import com.conjifs.domain.model.Stage;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class BracketRulesService {
	private BracketCatalogService bracketCatalogService;
	private ModalityCatalogService modalityCatalogService;
	private CompeteCatalogService competeCatalogService;
	private MatchCatalogService matchCatalogService;
	private StageCatalogService stageCatalogService;
//	private MessageSource messageSource = new LocaleConfig().messageSource();
	
	@Transactional
	public List<List<Bracket>> createBrackets(Long championshipId, Long modalityId) {
		Modality modality = modalityCatalogService.search(championshipId, modalityId);
		Optional<List<Stage>> stagesList = Optional.of(modality.getStages().stream().filter(s -> s.getParentStage() == null).toList());
		Optional<Stage> stageOp = (stagesList.isPresent() ? (!stagesList.get().isEmpty() ? Optional.of(stagesList.get().get(0)) : Optional.empty()): Optional.empty());
		Set<Bracket> brackets = new HashSet<>();
		Set<Bracket> auxBrackets = new HashSet<>();
		List<List<Bracket>> listBrackets = new ArrayList<>();
		while(stageOp.isPresent()) {
			Stage stage = stageOp.get();
			auxBrackets = brackets;
			brackets = new HashSet<>();
			if (stage.getNameStage().equals(NameStage.GROUP)) {
				int numGroups = modality.getTeams().size() / modality.getGroupTeamsNumber();
				numGroups = modality.getTeams().size() % modality.getGroupTeamsNumber() != 0 ? numGroups + 1: numGroups;
				for (int i = 1; i <= numGroups; i++) {
					Bracket bracket = new Bracket();
					bracket.setStage(stage);
					bracket.setName("G" + i);
					brackets.add(bracketCatalogService.save(bracket));
				}
				stage.setBrackets(brackets);
			}
			else if(stage.getNameStage().equals(NameStage.FINAL)){
				Bracket b= new Bracket();
				b.setStage(stage);
				b.setName("F");
				brackets.add(bracketCatalogService.save(b));
				stage.setBrackets(brackets);
			}else {
				for (Bracket b : auxBrackets) {
					Bracket b1 = new Bracket();
					b1.setStage(stage);
					b1.setParentBracket(b);
					b1.setName(b.getName() + " - " + stage.getNameStage().toString().charAt(0) + 1);
					brackets.add(bracketCatalogService.save(b1));
					Bracket b2 = new Bracket();
					b2.setStage(stage);
					b2.setParentBracket(b);
					b2.setName(b.getName() + " - " + stage.getNameStage().toString().charAt(0) + 2);
					brackets.add(bracketCatalogService.save(b2));
				}
				stage.setBrackets(brackets);
			}
			listBrackets.add(stage.getBrackets().stream().toList());
			stagesList = Optional.of(modality.getStages().stream().filter(s -> s.getParentStage() == stage).toList());
			stageOp = (stagesList.isPresent() ? (!stagesList.get().isEmpty() ? Optional.of(stagesList.get().get(0)) : Optional.empty()): Optional.empty());
		}
		return listBrackets;
	}
	
	@Transactional
	public Set<Bracket> clearAll(Long championshipId, Long modalityId, Long stageId){
		Stage stage = stageCatalogService.search(championshipId, modalityId, stageId);
		competeCatalogService.clearAll(stage);
		matchCatalogService.deleteAllStage(stage);
		return stageCatalogService.search(championshipId, modalityId, stageId).getBrackets();
	}

	public Bracket clear(Long championshipId, Long modalityId, Long stageId, Long bracketId) {
		competeCatalogService.clear(championshipId, modalityId, stageId, bracketId);
		matchCatalogService.deleteAllBracket(championshipId, modalityId, stageId, bracketId);
		return bracketCatalogService.search(championshipId, modalityId, stageId, bracketId);
	}
	
	
}

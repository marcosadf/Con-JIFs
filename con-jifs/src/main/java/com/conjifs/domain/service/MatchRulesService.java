package com.conjifs.domain.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.conjifs.config.LocaleConfig;
import com.conjifs.domain.exception.EntityNotFoundException;
import com.conjifs.domain.model.Bracket;
import com.conjifs.domain.model.Dispute;
import com.conjifs.domain.model.Match;
import com.conjifs.domain.model.Modality;
import com.conjifs.domain.model.NameStage;
import com.conjifs.domain.model.Stage;
import com.conjifs.domain.model.Team;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class MatchRulesService {
	private DisputeCatalogService disputeCatalogService;
	private MatchCatalogService matchCatalogService;
	private ModalityCatalogService modalityCatalogService;
	private MessageSource messageSource = new LocaleConfig().messageSource();
	
	@Transactional
	public void createMatchs(Long championshipId, Long modalityId) {
		Modality modality = modalityCatalogService.search(championshipId, modalityId);
		Set<Stage> stages = modality.getStages();
		if(!stages.isEmpty()) {
			Set<Team> teams = new HashSet<>();
			Set<Team> auxTeams = new HashSet<>();
			Set<Match> matchs = new HashSet<>();
			Set<Bracket> brackets = new HashSet<>();
			for (Stage stage : stages) {
				brackets = stage.getBrackets();
				for (Bracket bracket: brackets) {
					if(stage.getNameStage().equals(NameStage.GROUP)) {
						teams = bracket.getCompetes().stream().map(c -> c.getTeam()).collect(Collectors.toSet());
						System.out.println(teams);
						auxTeams = teams;
						for (Team team : teams) {
							auxTeams = auxTeams.stream().filter(t -> !t.equals(team)).collect(Collectors.toSet());
							for (Team t : auxTeams) {
								Match match = new Match();
								match.setBracket(bracket);
								SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
								Date date = null;
								try {
									date = sdf.parse("0001-01-01");
								} catch (ParseException e) {
									e.printStackTrace();
								}
								match.setDateTime(date);
								match.setLocale("Undefined");
								match = matchCatalogService.save(match);
								Dispute d1 = new Dispute();
								d1.setMatch(match);
								d1.setTeam(team);
								d1 = disputeCatalogService.save(d1);
								Dispute d2 = new Dispute();
								d2.setMatch(match);
								d2.setTeam(t);
								d2 = disputeCatalogService.save(d2);
								match.setDisputes(new HashSet<>(List.of(d1, d2)));
								matchs.add(match);
							}
						}
						bracket.setMatchs(matchs);
						matchs.clear();
					}
					else {
						Match match = new Match();
						match.setBracket(bracket);
						SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
						Date date = null;
						try {
							date = sdf.parse("0001-01-01");
						} catch (ParseException e) {
							e.printStackTrace();
						}
						match.setDateTime(date);
						match.setLocale("Undefined");
						match = matchCatalogService.save(match);
						matchs.add(match);
						bracket.setMatchs(matchs);
						matchs.clear();
					}
				}
			}
//			List<Bracket> bracketsList = new ArrayList<>();
//			List<Set<Match>> matchList = new ArrayList<>();
//			modalityCatalogService.search(championshipId, modalityId).getStages().forEach(s -> {
//				s.getBrackets().forEach(b -> {
//					bracketsList.add(b);
//				});
//			});
//			System.out.println();
//			bracketsList.forEach(b ->{
//				matchList.add(b.getMatchs());
//			});
//			return matchList;
		}
		else {
			throw new EntityNotFoundException(messageSource.getMessage("stage.not.found", null, LocaleContextHolder.getLocale()));
		}
	}
	
	@Transactional
	private List<List<Dispute>> createNextDisputes(Long championshipId, Long modalityId){
		Modality modality = modalityCatalogService.search(championshipId, modalityId);
		List<Stage> stages = modality.getStages().stream().filter(s -> s.getParentStage() == null).collect(Collectors.toList());
		Stage stage = null;
		if(!stages.isEmpty()) {
			Optional<Stage> stageOp = Optional.of(stages.get(0));
			Optional<List<Stage>> stagesList;
			
			while (stageOp.isPresent()) {
				Stage auxStage = stageOp.get();
				stage = auxStage;
				stagesList = Optional.of(modality.getStages().stream().filter(s -> s.getParentStage() == auxStage).toList());
				stageOp = (stagesList.isPresent() ? (!stagesList.get().isEmpty() ? Optional.of(stagesList.get().get(0)) : Optional.empty()): Optional.empty());
			}
			Set<Team> teams = new HashSet<>();
			Set<Team> auxTeams = new HashSet<>();
			Set<Bracket> brackets = new HashSet<>();
			Optional<Match> matchOp = Optional.empty();
			List<List<Dispute>> listDisputesList = new ArrayList<>();
			while(stage != null && stage.getConcluded()){
				if(stage.getConcluded() && !stage.getParentStage().getConcluded()) {
					brackets = stage.getParentStage().getBrackets();
					for (Bracket bracket: brackets) {
						matchOp = !bracket.getMatchs().isEmpty() ? Optional.of(bracket.getMatchs().stream().toList().get(0)) : Optional.empty();
						if(matchOp.isPresent()) {
							Match match = matchOp.get();
							teams = bracket.getCompetes().stream().map(c -> c.getTeam()).collect(Collectors.toSet());
							auxTeams = teams;
							for (Team team : teams) {
								auxTeams = auxTeams.stream().filter(t -> !t.equals(team)).collect(Collectors.toSet());
								for (Team t : auxTeams) {
									Dispute d1 = new Dispute();
									d1.setMatch(match);
									d1.setTeam(team);
									d1 = disputeCatalogService.save(d1);
									Dispute d2 = new Dispute();
									d2.setMatch(match);
									d2.setTeam(t);
									d2 = disputeCatalogService.save(d2);
									match.setDisputes(new HashSet<>(List.of(d1, d2)));
								}
							}
							listDisputesList.add(match.getDisputes().stream().collect(Collectors.toList()));
						}
						
					}
				}
				stage = stage.getParentStage();
			}
			return listDisputesList;
		}
		else {
			throw new EntityNotFoundException(messageSource.getMessage("stage.not.found", null, LocaleContextHolder.getLocale()));
		}
	}
}

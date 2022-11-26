package com.conjifs.domain.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.groups.ConvertGroup;
import javax.validation.groups.Default;

import com.conjifs.domain.ValidationGroups;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
@Entity
public class Dispute {
	@EqualsAndHashCode.Include
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Valid
	@ManyToOne
	@JoinColumn(name = "team_id")
	@ConvertGroup(from = Default.class, to = ValidationGroups.TeamId.class)
	@NotNull
	private Team team;
	
	@Valid
	@ManyToOne
	@JoinColumn(name = "match_id")
	@ConvertGroup(from = Default.class, to = ValidationGroups.MatchId.class)
	@NotNull
	private Match match;
	
	@NotNull
	@Column(columnDefinition = "integer default 0")
	private Integer points = 0;
}

package com.conjifs.domain.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
public class Compete {
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
	@JoinColumn(name = "bracket_id")
	@ConvertGroup(from = Default.class, to = ValidationGroups.BracketId.class)
	@NotNull
	private Bracket bracket;
	
	@Column(columnDefinition = "integer default 0")
	private Integer points = 0; 
	
	@Enumerated(EnumType.STRING)
	private Result result;
}

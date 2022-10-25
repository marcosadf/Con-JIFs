package com.conjifs.domain.model;

import java.util.LinkedHashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.validation.groups.ConvertGroup;
import javax.validation.groups.Default;

import com.conjifs.domain.ValidationGroups;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
@Entity
public class Modality {
	@EqualsAndHashCode.Include
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Valid
	@ConvertGroup(from = Default.class, to = ValidationGroups.ChampionshipId.class)
	@ManyToOne
	@NotNull
	private Championship championship;
	
	@NotBlank
	@Size(max = 100)
	private String name;
	
	@NotNull
	@Column(name = "type_competition")
	@Enumerated(EnumType.STRING)
	private TypeCompetition typeCompetition;
	
	@Column(name = "group_teams_number")
	private Integer groupTeamsNumber;
	
	@Column(name = "group_approved_number")
	private Integer groupApprovedNumber;
	
	@JsonIgnore
	@OneToMany(mappedBy = "modality", cascade = CascadeType.ALL)
	private Set<Stage> stages = new LinkedHashSet<>();
	
	@JsonIgnore
	@OneToMany(mappedBy = "modality", cascade = CascadeType.ALL)
	private Set<Team> teams = new LinkedHashSet<>();
}